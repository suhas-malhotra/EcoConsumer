const express = require("express");
const dealerAPI = require("../../../controller/dealer/dealerApi");
const { verifyTokenDealer } = require("../../../middleware/verifyToken");
const router = express.Router();
router.post("/cars", verifyTokenDealer, dealerAPI.allCars);

router.post("/register", dealerAPI.register);

router.post("/login", dealerAPI.login);

router.post("/add/car", verifyTokenDealer, dealerAPI.addCar);

module.exports = router;
