const e = require("express");
const moongose = require("mongoose");

const connectionRequestSchema = new moongose.Schema(
  {
    fromUserId: {
      type: moongose.Schema.Types.ObjectId,
      ref:  "User", //connecting two tables or linking two tables(reference to user table)
      required: true,
    },
    toUserId: {
      type: moongose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "interested", "rejected", "ignored"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You can't send connection request to yourself");
  }
  next();
});

const ConnectionRequest = moongose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
