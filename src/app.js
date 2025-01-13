const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("/test request received");
});

app.use((req, res) => {
  res.send(" request received");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//nodeman src/app.js
