const mongoose = require("mongoose");
const buyingFAQSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const BuyingFAQ = mongoose.model("BuyingFAQ", buyingFAQSchema);
module.exports = BuyingFAQ;
