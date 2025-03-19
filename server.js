const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from CI/CD Pipeline!");
});


app.get("/api", (req, res) => {
  res.send("Hello from api route!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
