const express = require("express");
const JWT = require("jsonwebtoken");

const User = require("../../models/clientModel");
const Car = require("../../models/carModel");
const Dealer = require("../../models/dealerModel");

module.exports.register = async (req, res) => {
  const { email, name, password } = req.body;

  const ClientDetails = new User({
    email,
    name,
    password,
  });

  ClientDetails.save()
    .then((response) => {
      // If everything goes as planed
      //use the retured user document for something
      return res
        .status(200)
        .json({ msg: "Client saved Successfully :)", id: response._id });
    })
    .catch((error) => {
      //When there are errors We handle them here
      res.status(404).json({ msg: "Bad Request" });
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.find({
    email,
  });
  //if invalid user email
  if (user.length == 0) {
    return res.status(404).json({ msg: "User not found" });
  }
  //if password do not match
  if (user[0].password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  //creating token for 365 days
  const token = JWT.sign({ user }, process.env.SECRET_TOKEN_USER, {
    expiresIn: "365d",
  });
  user.push({ token: token });
  user[0].password = "";
  return res.status(200).json(user);
};

module.exports.allCars = async (req, res) => {
  const cars = await Car.find({ isBought: false });

  return res.status(200).json(cars);
};

module.exports.acceptCar = async (req, res) => {
  const { carId, clientId } = req.body;

  const car = await Car.findOne({ _id: carId });
  if (car.isBought) {
    return res
      .status(401)
      .json({ msg: "Car already Sold , please referesh the page" });
  }

  Car.updateOne(
    { _id: carId },
    { $set: { client: clientId, isBought: true } },
    (err, res) => {
      if (err) throw err;
    }
  );

  const dealer = await Dealer.findOne({ _id: car.dealer });

  return res.status(200).json(dealer.name);
};
