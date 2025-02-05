const express = require("express");
const { validateSignupData } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  validateSignupData(req);

  const { firstname, lastname, email, password } = req.body;
  const passwordHash = await bcrypt.hashSync(password, 10);
  const user = new User({ firstname, lastname, email, password: passwordHash });
  try {
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordvalid = await user.validatePassword(password);
    if (isPasswordvalid) {
      const token = await user.getJwtToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error logging in user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User logged out successfully");
});
module.exports = authRouter;
