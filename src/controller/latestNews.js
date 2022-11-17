const latestNewsModel = require("../models/latestNews");

const getAllNews = async (req, res) => {
  latestNewsModel
    .find()
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};
const getNews = async (req, res) => {
  const id = req.params.id;
  latestNewsModel
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

const addNews = async (req, res) => {
  let news = new latestNewsModel({
    title: req.body.title,
    description: req.body.description,
    newsImage: req.file.path.toString(),
  });

  try {
    if (Object.keys(news).length === 0) {
      return res.send({ message: "Invalid Request" });
    }
    news
      .save()
      .then((data) => {
        return res.status(200).send({ message: "News Created", data });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: err.message || "News Can't be Created" });
      });
  } catch (err) {
    console.log(err);
  }
};
const updateNews = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "News to update can not be empty" });
  }
  const id = req.params.id;
  latestNewsModel
    .findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update News } : User Not Found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating the news" });
    });
};

//delete a user with specific id

const deleteNews = (req, res) => {
  const id = req.params.id;

  latestNewsModel
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

module.exports = { getAllNews, addNews, updateNews, deleteNews, getNews };
