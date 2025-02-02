const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { UserAuth } = require("../Middlewares/auth");

profileRouter.get("/Profile", UserAuth, async (req, res) => {
    try {
      const user = req.user;
  
      res.send(user);
    } catch (err) {
      res.status(401).send("Error" + err.message);
    }
  });

module.exports = profileRouter;