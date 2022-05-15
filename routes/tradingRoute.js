const express = require("express");
const controller = require("./../controllers/tradeController");
const router = express.Router();
router.route("/").get(controller.getcoininfo);
module.exports = router;
