const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  images: {
    productImages :{
      type: Object,
    },
    floorplan : {
      type: Object,
    },
  },
  regularprice: {
    type: Number,
  },
  mortgagePrice: {
    type: Number,
  },
  title: {
    type: String,
  },

  descriptiontext: {
    type: String,
  },
  address: {
    type: String,
  },
  propertytype: {
    type: String,
  },
  bathrooms: {
    type: String,
  },
  bedrooms: {
    type: String,
  },
  tenure: {
    type: String,
  },

  location: {
    type: String,
  },

  streetview: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
