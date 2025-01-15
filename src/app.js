const express = require("express");

const app = express();

//get request
app.get("/test", (req, res) => {
  res.send("Testing GET request");
});

//works for both /ab and /abc
app.get("/ab?c", (req, res) => {
  res.send("About page with ?");
});

//works for /ab , /abc , /abbc , /abbbbbbbbbc and so on
app.get("/ab+c", (req, res) => {
  res.send("About page with +");
});

//works for /abcd , /abxcd , /abFOOcd , /ab123cd and so on
app.get("/ab*cd", (req, res) => {
  res.send("About page with *");
});


//post request
app.post("/test", (req, res) => {
  console.log("POST request received");
  res.send("Testing POST request");
});

//use is used for all the request types
app.use("/test", (req, res) => {
  res.send("/test request received");
});

app.use((req, res) => {
  res.send(" request received");
});

app .listen(3000, () => {
  console.log("Server is running on port 3000");
});

//nodeman src/app.js
// we can also add the script in package.json file to run the server using command npm run "name"
