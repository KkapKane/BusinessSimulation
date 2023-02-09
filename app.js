const { getTransactions } = require("./controllers/controller");
const { generateTransaction } = require("./simulations/simulateTransaction");
const { default: axios } = require("axios");

const server = setInterval(() => {
  (async () => {
    let transaction = await getTransactions();
    if (transaction.length > 999) {
      axios.delete(
        `https://puce-beautiful-beaver.cyclic.app/restaurant/transactions/${transaction.firstId}`
      );
    }

    generateTransaction();
  })();
}, 5000);
