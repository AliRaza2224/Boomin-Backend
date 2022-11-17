const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  userModel
    .find()
    .then((user) => {
      return res.status(200).json({ success: true, user });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};
const getUser = async (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: `Cannot Fiind User with ${email} : User Not Found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "User Doesn't exist" });
    });
};

const registerUser = async (req, res) => {
  let user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password),
    profileImage: req.file.path.toString(),
  });

  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ message: "User Already Exist" });
    }
    if (Object.keys(user).length === 0) {
      return res.send({ message: "User Can't be empty" });
    }
    user
      .save()
      .then((user) => {
        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res
          .status(200)
          .send({ message: "User Created", user, token: token });
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: err.message || "User Can't be Created" });
      });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    await userModel
      .findOne({ email: req.body.email })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            success: true,
            user,
            token: token,
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password Invalid" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      });
  } catch (error) {
    console.log("Error", error);
  }
};

//update users with specific ID
const updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(id, { $set: req.body })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Cannot Update User with ${email} : User Not Found`,
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update the user" });
    });
};

//delete a user with specific id

const deleteUser = (req, res) => {
  const id = req.params.id;
  const email = req.body.email;

  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: `Cannot Delete user with id: ${email} ` });
      } else {
        res.send({
          message: "User Deleted Successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could Not Delete User with id: ${email}`,
      });
    });
};

module.exports = {
  getAllUser,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
