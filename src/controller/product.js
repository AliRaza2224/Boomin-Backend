const mongoose = require("mongoose");
const productModel = require("../models/product");

const getAllProducts = async (req, res) => {
  productModel
    .find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  productModel
    .findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: `Cannot Find Data with ${id} : User Not Found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Data Doesn't exist" });
    });
};
const searchProduct = async (req, res) => {
  let data = await productModel.find({
    $or: [{ title: { $regex: req.params.key } }],
  });
  res.send(data);
};

const addProduct = async (req, res) => {
  let product = new productModel({
    userId: mongoose.Types.ObjectId(),
    title: req.body.title,
    descriptiontext: req.body.descriptiontext,
    address: req.body.address,
    propertytype: req.body.propertytype,
    bathrooms: req.body.bathrooms,
    bedrooms: req.body.bedrooms,
    tenure: req.body.tenure,
    images: req.files,
    regularprice: req.body.regularprice,
    mortgagePrice: req.body.mortgagePrice,
    location: req.body.location,
    streetview: req.body.streetview,
    category: req.body.category,
    status: req.body.status,
  });
  console.log("productImages++++++Floor Images", req);
  console.log("productImages++++++Floor Images", req.body);
  try {
    if (Object.keys(product).length === 0) {
      return res.send({ message: "Invalid Request" });
    }
    product
      .save()
      .then((data) => {
        return res.status(200).send({ message: "Product Listed", data });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: err.message || "Product Can't be Created" });
      });
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  if (req.file) {
    const images = req.file;
    req.body.image = images;
  }
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Product to update can not be empty" });
  }
  const id = req.params.id;
  productModel
    .findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update Product } : User Not Found`,
        });
      } else {
        res.send({ success: true, data: data });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Home Data not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating Home Data with id " + req.params.id,
      });
    });
};

//delete a user with specific id

const deleteProduct = (req, res) => {
  const id = req.params.id;

  productModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete data with id: ${id} ` });
      } else {
        res.send({
          message: "User Deleted Successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could Not Delete Data with id: ${id}`,
      });
    });
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProduct,
};
