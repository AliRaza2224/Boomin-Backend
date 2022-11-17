const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "Please Enter First Name"],
    },

    lastName: {
      type: String,
      require: [true, "Please Enter Last Name"],
    },
    email: {
      type: String,
      require: [true, "Please Enter Your Email"],
    },
    password: {
      type: String,
      require: [true, "Please Enter Password"],
    },

    profileImage: {
      type: Object,
      require: [true, "Please Enter Password"],
    },
    contactnumber: {
      type: Number,
    },
    address: {
      zipcode: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      residencearea: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
