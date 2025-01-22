const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Validate the user data
  validateSignupData(req);

  // encrypt the password
  const { firstname, lastname, email, password } = req.body;
  const passwordHash = await bcrypt.hashSync(password, 10);
  console.log(passwordHash);

  //console.log(req.body);
  const user = new User({ firstname, lastname, email, password: passwordHash });
  try {
    // Save the user to the database
    await user.save();

    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res)  => {
  try {
    const { email, password } = req.body;

    // Find the user with the email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email ID not found");
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (isPasswordvalid) {
      res.send("User logged in successfully");
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (err) {
    console.error("Error logging in user:", err.message);
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
  } catch (err) {
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

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    // Check if the fields are allowed to date
    const ALLOWED_FIELDS = [
      "firstname",
      "photoURL",
      "lastName",
      "password",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((field) =>
      ALLOWED_FIELDS.includes(field)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid fields to update");
    }

    // Update the user
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true, // to run the validators on the updated data
      returnDocument: "after",
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong :" + err.message);
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
