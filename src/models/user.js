const e = require("express");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
});

const UserModel= mongoose.model("User",userSchema);

module.exports = UserModel;