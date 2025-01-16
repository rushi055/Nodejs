const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  try {
    // Create a new user
    const user = new User({
      firstname: "Rushikesh",
      lastName: "Chaudhari",
      email: "rushi@gmail.com",
      password: "rushi123",
      age: 21,
    });

    // Save the user to the database
    await user.save();

    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Internal Server Error");
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
