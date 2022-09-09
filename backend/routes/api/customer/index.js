const express = require("express");
const userAPI = require("../../controllers/user/userApi");
const { verifyTokenUser } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/login", verifyTokenUser, userAPI.login);

router.get("/all/cars", verifyTokenUser, userAPI.allCars);

router.post("/accept", verifyTokenUser, userAPI.acceptCar);

module.exports = router;
