const e = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },

    age: {
      type: Number,
      default: 18,
      min: 18,
      max: 100,
    },
    photoURL: {
      type: String,
      default: "https://www.google.com",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
    gender: {
      type: String,
      enum :{
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      }
      //only run validation when adding new user but when we add runvalidators:true in patch method then it will run validation for updation also
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Invalid Gender entered");
      //   }
      // },
      //default: "others",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwtToken = async function () {
  const user = this; //this keywords does work in arrow function
  const token = await jwt.sign({ _id: this._id }, "mysecretkey", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordvalid = await bcrypt.compare(password, passwordHash);

  return isPasswordvalid;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
