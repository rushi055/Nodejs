const express = require("express");

const app = express();
const { AdminAuth , UserAuth } = require("./Middlewares/auth");

// Middleware to handle authentication for all GET, POST, etc. requests
app.use("/admin",AdminAuth);

app.post("/user/login", (req, res) => {
  console.log("User Log In Successfully");
  res.send("login is Successful");
});

app.get("/user/getData",UserAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
