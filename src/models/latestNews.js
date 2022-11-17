const mongoose = require("mongoose");

const latestNewsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  newsImage: {
    type: Object,
  },
});

const LatestNews = mongoose.model("LatestNews", latestNewsSchema);

module.exports = LatestNews;
