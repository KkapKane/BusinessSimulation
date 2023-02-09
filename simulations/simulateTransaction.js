const { populateCart, pickRandomItem } = require("./simulateOrder");
const { sendTransactions } = require("../controllers/controller");
const { generateCustomer } = require("./simulateCustomer");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


async function generateTransaction() {
    let rndNumber = randomIntFromInterval(0, 10);
  let customerName = await generateCustomer(rndNumber);
  let cart = await populateCart(rndNumber);

 sendTransactions(customerName, cart.item.length, cart.price, cart.item);

  console.log(customerName)
    console.log(cart.item)
  console.log(cart.price)

  
}

module.exports = {
  generateTransaction,
};
