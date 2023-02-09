const { getFoods, getDrinks } = require("../controllers/controller");

//grabs 1 random Item
async function pickRandomItem() {
  foodlist = await getFoods();
  drinklist = await getDrinks();
  let combined = [...foodlist, ...drinklist];
  let organizedCombined = combined.map((item) => {
    return { name: item.name, qty: 1, price: item.price };
  });
  return organizedCombined[
    Math.floor(Math.random() * organizedCombined.length)
  ];
}
//picks a random number and populate cart with that number
async function populateCart(number) {
  let cart = [];
  for (let i = 0; i < number; i++) {
    let grabItem = await pickRandomItem();
    cart.push(grabItem);
  }
  if (cart.length == number) {
    let price = cart.reduce((p,c)=>{
        return p + c.price
    }, 0)
   
    return {item:cart, price: price}
  }
}

module.exports = {
  pickRandomItem,
  populateCart,
};
