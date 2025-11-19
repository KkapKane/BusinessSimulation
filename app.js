const { getTransactions } = require("./controllers/controller");
const { generateTransaction } = require("./simulations/simulateTransaction");
const moment = require("moment");
const express = require("express");
const Chance = require("chance");
const { default: axios } = require("axios");
const port = 5000;

var chance = new Chance();

const app = express();

app.listen(port, () => startLoop());

async function startLoop() {
  const server = setInterval(() => {
    (async () => {
      // Update time and busy hours on each interval
      let time = new Date();
      let currentHour = parseInt(moment(time).format("HH"));
      
      let BusyHour = {
        breakfast: currentHour >= 8 && currentHour < 11,
        lunch: currentHour >= 12 && currentHour < 14,
        dinner: currentHour >= 18 && currentHour < 21,
      };
      let closed = currentHour >= 0 && currentHour < 8;
      
      let transaction = await getTransactions();
      if (transaction.length > 100) {
        axios.delete(
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
