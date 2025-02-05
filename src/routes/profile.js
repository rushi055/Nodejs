const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { UserAuth } = require("../Middlewares/auth");
const bcrypt = require("bcrypt");

const { validateProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(401).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (validateProfileData(req)) {
      return res.status(400).send("Invalid Data");
    }

    const logged_in_user = req.user;
    const { password } = req.body;

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      logged_in_user.password = passwordHash;
    }

    Object.keys(req.body).forEach((key) => {
      if (key !== "password") {
        // Avoid overwriting the hashed password
        logged_in_user[key] = req.body[key];
      }
    });
    
    await logged_in_user.save();

    console.log(logged_in_user);

    res.json({
      message:
        "${logged_in_user.firstname}, your profile is updated successfully",
      user: logged_in_user,
    });

    //res.send("${logged_in_user.firstname}, your profile is updated successfully")
  } catch (err) {
    res.status(401).send("Error" + err.message);
  }
});

module.exports = profileRouter;
