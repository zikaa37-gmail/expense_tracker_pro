require("express-async-errors");
const mongoose = require("mongoose");
const errorHandler = require("./handlers/errorHandler");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.info("mongoDb connection successful");
  })
  .catch((err) => {
    console.error("Connection to mongoDb failed", err);
  });

// Models
require("./models/users.model");
require("./models/transactions.model");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./modules/users/users.routes"));
app.use(
  "/api/transactions",
  require("./modules/transactions/transactions.routes")
);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Resource not found",
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started successfully!");
});
