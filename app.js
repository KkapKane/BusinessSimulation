const { getTransactions } = require("./controllers/controller");
const { generateTransaction } = require("./simulations/simulateTransaction");
const moment = require("moment");
const express = require("express");
const Chance = require("chance");
const { default: axios } = require("axios");
const port = 5000;

var chance = new Chance();

const app = express();

app.get("/health", (req, res) => {
  console.log("Health check request received");
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, () => startLoop());

async function startLoop() {
  const server = setInterval(() => {
    (async () => {
      // Update time and busy hours on each interval
      let time = new Date();
      let currentHour = parseInt(moment(time).format("HH"));

      let BusyHour = {
        breakfast: currentHour >= 10 && currentHour < 11,
        lunch: currentHour >= 12 && currentHour < 14,
        dinner: currentHour >= 18 && currentHour < 21,
      };
      let closed = currentHour < 10 || currentHour >= 22;

      let transaction = await getTransactions();

      // Delete oldest transaction if at cap
      if (transaction.length >= 100) {
        await axios.delete(
          `https://restaurantbackend-9o91.onrender.com/restaurant/transactions/0`
        );
      }

      if (BusyHour.breakfast) {
        if (chance.d2() === 2) {
          console.log("from breakfast hrs");
          generateTransaction();
        }
      } else if (BusyHour.lunch) {
        console.log("from lunch hrs");
        if (chance.d2() == 2) {
          generateTransaction();
        }
      } else if (BusyHour.dinner) {
        if (chance.d2() >= 1) {
          console.log("from dinner hrs");
          generateTransaction();
        }
      } else if (closed) {
        console.log("from closed");

        return;
      } else {
        console.log("from normal hrs (Hour: " + currentHour + ")");
        if (chance.d4() >= 2) {
          generateTransaction();
        }
      }
    })();
  }, 10000);
}
