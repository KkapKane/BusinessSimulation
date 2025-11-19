const axios = require("axios");
//fetching all foods from menu
async function getFoods() {
  const res = await axios.get(
    "https://restaurantbackend-9o91.onrender.com/restaurant/menu/foods"
  );
  let foodlist = res.data.map((food) => {
    return { name: food.name, price: food.price };
  });
  return foodlist;
}

// fetching transactions
async function getTransactions() {
  const res = await axios.get(
    "https://restaurantbackend-9o91.onrender.com/restaurant/transactions"
  );

  return {
    length: res.data.length,
  };
}
//fetching all drinks from menu
async function getDrinks() {
  const res = await axios.get(
    "https://restaurantbackend-9o91.onrender.com/restaurant/menu/drinks"
  );
  let drinklist = res.data.map((drink) => {
    return { name: drink.name, price: drink.price };
  });
  return drinklist;
}
//send transaction
async function sendTransactions(name, qty, price, order) {
  const res = await axios.post(
    "https://restaurantbackend-9o91.onrender.com/restaurant/transactions",
    {
      customerName: name,
      totalQty: qty,
      totalPrice: price,
      order: order,
    }
  );
}

module.exports = {
  sendTransactions,
  getDrinks,
  getFoods,
  getTransactions,
};
