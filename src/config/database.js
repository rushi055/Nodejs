const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        await mongoose.connect(
            "mongodb+srv://rushikeshapc410:rushi1234@project.u1jky.mongodb.net/devTinder"
          );
    }
    catch(err){
        console.error("Error connecting to database");
    }
 
};

module.exports = connectDb;
