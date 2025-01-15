const express = require("express");

const app = express();

app.use("/routes", rH1, [rH2, rH3], rH4, rh5);

app.use("/user", [
  (req, res, next) => {
    console.log("Handling the Route User 1 !!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 2 !!");
    //res.send("Hello World");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route User 3 !!");
    next();
    //res.send("3rd Response");
  },
  (req, res, next) => {
    console.log("Handling the Route User 4 !!");
    res.send("4th Response");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
