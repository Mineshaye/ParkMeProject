const express = require("express");
const Router = require("./router");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/CSC310")
  .then(() => console.log("Connected to MongoDb..."))
  .catch(() => console.log("Falied to connect to mongodb"));

app.use(express.json());
app.use("/api/parking", Router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
