const express = require("express");
const dealerAPI = require("../../controllers/dealer/dealerApi");
const { verifyTokenDealer } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/login", verifyTokenDealer, dealerAPI.login);

router.post("/add/car", verifyTokenDealer, dealerAPI.addCar);

router.get("/cars", verifyTokenDealer, dealerAPI.allCars);

module.exports = router;
