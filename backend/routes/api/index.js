const express = require("express");
const router = express.Router();

router.use("/dealer", require("./dealer"));
router.use("/user", require("./customer"));

module.exports = router;
