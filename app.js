const { getTransactions } = require("./controllers/controller");
const { generateTransaction } = require("./simulations/simulateTransaction");
const moment = require("moment");
const Chance = require('chance');
const { default: axios } = require("axios");


var chance = new Chance();
var time = new Date();


let BusyHour = {
  breakfast: moment(time).format("HH") > 8 && moment(time).format("HH") < 11,
  lunch: moment(time).format("HH") > 12 && moment(time).format("HH") < 14,
  dinner: moment(time).format("HH") > 18 && moment(time).format("HH") < 21,
};
let closed = moment(time).format("HH") > 12 && moment(time).format("HH") < 8;

const server = setInterval(() => {
  (async () => {
    let transaction = await getTransactions();
    if (transaction.length > 100) {
      axios.delete(
        `https://puce-beautiful-beaver.cyclic.app/restaurant/transactions/${transaction.firstId}`
      );
    }

    
    
    if(BusyHour.breakfast){
      if(chance.d4() === 2){
        generateTransaction();
      }
        
    }
    else if(BusyHour.lunch){
       if (chance.d4() === 2) {
         generateTransaction();
       }
    }
    else if(BusyHour.dinner){
       if (chance.d2() >= 2) {
         generateTransaction();
       }
    }
    else if(closed) {
      console.log("we closed now")
      
    }
    else {
       if (chance.d10() === 7) {
         generateTransaction();
       }
    }
    

  })();
}, 5000);
