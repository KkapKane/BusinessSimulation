const axios = require("axios");

async function generateCustomer() {
  const res = await axios.get("https://api.namefake.com/english-united-states");

  return res.data.name;
}

module.exports = {
  generateCustomer,
};
