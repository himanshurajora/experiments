const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Got It" });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
