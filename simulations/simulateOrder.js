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
//populate cart with with how many items given in param
async function populateCart(number) {
  let cart = [];
  let cartLength = number;
  //loops through x amount of times to create item
  for (let i = 0; i < number; i++) {
    let grabItem = await pickRandomItem();
    let index = cart.findIndex((x) => x.name === grabItem.name);
    //if the item isn't already in the cart then push it
    if (index === -1) {
      cart.push(grabItem);
    }
    //if it already exist in the cart then...
    else {
      // find index of the duplicate item
      let duplicateIndex = cart.findIndex(
        (item) => item.name === grabItem.name
      );
      //add 1 to the qty
      let modified = {
        ...grabItem,
        name: grabItem.name,
        qty: grabItem.qty + 1,
        price: grabItem.price,
      };
      //multiply the price by the qty
      let modifiedPrice = {
        ...modified,
        name: modified.name,
        qty: modified.qty,
        price: modified.price * modified.qty,
      };
      //removes the original duplicate
      cart.splice(duplicateIndex, 1);
      cartLength--;

      cart.push(modifiedPrice);
    }
  }
  //once the cart is filled calculate the total
  if (cart.length == cartLength) {
    let price = cart.reduce((p, c) => {
      return p + c.price;
    }, 0);

    return { item: cart, price: price };
  }
}

module.exports = {
  pickRandomItem,
  populateCart,
};
