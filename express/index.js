const express = require("express");

const app = express();

let count = 0;

app.get("/", (req, res) => {
  let currentCount = count;
  currentCount++;
  count = currentCount;
  res.json({ message: "Got It", count });
});

app.get("/long", (req, res) => {
  let currentCount = count;
  setTimeout(() => {
    currentCount++;
    count = currentCount;
  }, 3000);
  setTimeout(() => {
    res.json({
      count,
    });
  }, 15000);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
