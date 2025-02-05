const express = require("express");
const { UserAuth } = require("../Middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status : " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }

      const existingRequest = await ConnectionRequest.findOne({
       $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if(existingRequest){
        return res.status(400).json({ message: "Connection request already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request sent successfully",
        data: data,
      });

      //res.send(user.firstname + " " + "has sent a connection request");
    } catch (err) {
      res.status(401).send("Error" + err.message);
    }
  }
);

requestRouter.post("/");

module.exports = requestRouter;
