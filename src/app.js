const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("./Middlewares/auth");
app.use(express.json());
app.use(cookieParser());

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (isPasswordvalid) {
      //Create JWT token
      const token = await jwt.sign({ _id: user._id }, "mysecretkey", {
        expiresIn: "1h",
      });

      //Add the token to the cookie and send the response back to the user
      res.cookie("token", token);
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error logging in user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

//only way to get jwt token is by login(cookies will be generated) and then by profile , if user try to fetch profile without login that is without cookies then it will give error
app.get("/Profile", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(401).send("Error" + err.message);
  }
});

app.post("/sendConnectionrequest", UserAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstname + " " + "has sent a connection request");
  } catch (err) {
    res.status(401).send("Error" + err.message);
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
