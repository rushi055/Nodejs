const express = require("express");
const { UserAuth } = require("../Middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionrequest", UserAuth, async (req, res) => {
    try {
      const user = req.user;
  
      res.send(user.firstname + " " + "has sent a connection request");
    } catch (err) {
      res.status(401).send("Error" + err.message);
    }
  });
  

module.exports = requestRouter;