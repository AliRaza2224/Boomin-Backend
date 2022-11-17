const BuyingFAQModel = require("../models/buyingFAQ");

const addFAQ = async (req, res) => {
  let newFAQ = new BuyingFAQModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    if (Object.keys(newFAQ).length === 0) {
      return res.send({ message: "Invalid Request" });
    }
    newFAQ.save()
      .then((data) => {
        return res.status(200).send({ message: "FAQ Created", data });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: err.message || "FAQ Can't be Created" });
      });
  } catch (err) {
    console.log(err);
  }
};

const getAllFAQ = async (req, res) => {
  BuyingFAQModel.find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const getFAQ = async (req, res) => {
  const id = req.params.id;
  BuyingFAQModel.findById(id)
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

const updateFAQ = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "FAQ to update can not be empty" });
  }
  const id = req.params.id;
  BuyingFAQModel.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update FAQ } : Data Not Found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating the news" });
    });
};

const deleteFAQ = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "FAQ to delete can not be empty" });
  }
  const id = req.params.id;
  BuyingFAQModel.findByIdAndDelete(id)
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

module.exports = { getAllFAQ, getFAQ, addFAQ, updateFAQ, deleteFAQ };
