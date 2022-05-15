const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/tradingRoute");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "null");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.static(`${__dirname}/public`));
app.use("/api/v1/coins", router);
bodyParser.urlencoded({ extended: true });

module.exports = app;
