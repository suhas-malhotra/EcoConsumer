const express = require("express");
const userAPI = require("../../../controller/user/userApi");
const { verifyTokenUser } = require("../../../middleware/verifyToken");
const router = express.Router();

router.post("/register", userAPI.register);

router.post("/login", userAPI.login);

router.get("/all/cars", verifyTokenUser, userAPI.allCars);

router.post("/accept", verifyTokenUser, userAPI.acceptCar);

module.exports = router;
