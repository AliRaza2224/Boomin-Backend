const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const DB = require("./src/config/db");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
require("dotenv").config()

const PORT = process.env.TOKEN_SERVER_PORT || 5000;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use("/public", express.static("public"));
app.use("/api", require("./src/routes/product"))
app.use("/api", require("./src/routes/user"));
app.use("/api", require("./src/routes/latestNews"));
app.use("/api", require("./src/routes/buyingFAQ"));

// app.post("/login", (req, res) => {
//   res.json("Server Running Successfuly Login");
// });
// app.post("/signup", (req, res) => {
//   res.json("Server Running Successfuly Registration");
// });

// app.get("/login", (req, res) => {
//   res.json("Server Running Successfuly Login");
// });

DB();

app.listen(PORT, () => {
  console.log(`Server is Up and running on Port ${PORT}`);
});
