require("pretty-error").start();
const express = require("express");
const app = express();
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const log4js = require("log4js");
const log = log4js.getLogger("entrypoint");
log.level = "info";
const PORT = 7070;
const MONGO_URI = "mongodb://localhost:27017/sensus";

// * Basic
app.use(express.json());

// * Routing
app.get("/", (req, res, next) => {
  res.status(200).json({ success: success, message: "Welcome" });
});

app.get("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Nothing in this route" });
});

// * Database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", function () {
  log.info("MongoDB connected");
});
mongoose.connection.on("error", function (err) {
  log.error("MongoDB connection error: " + err);
});

// * Server
app.listen(PORT, (err) => {
  if (err) {
    log.error(err);
  }
  log.info(`Server running on ${PORT}`);
});
