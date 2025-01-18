const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const user = new User(req.body);
  try {
    // Save the user to the database
    await user.save();

    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });

    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } 
  
  catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database");
  });
