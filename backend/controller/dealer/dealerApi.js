const express = require("express");
const JWT = require("jsonwebtoken");
const Car = require("../../models/carModel");

const Dealer = require("../../models/dealerModel");
const Car = require("../../models/carModel");

module.exports.login = async (req, res) => {
  const { email, name, password } = req.body;
  let dealer = await Dealer.find({
    email,
  });
  //if invalid dealer email
  if (dealer.length === 0) {
    return res.status(404).json({ msg: "Dealer not found" });
  }
  //if password do not match
  if (dealer[0].password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  //creating token for 365 days
  const token = JWT.sign({ dealer }, process.env.SECRET_TOKEN_USER, {
    expiresIn: "365d",
  });
  dealer.push({ token: token });
  dealer[0].password = "";
  return res.status(200).json(dealer);
};

module.exports.addCar = async (req, res) => {
  const { name, model, year, dealer, price } = req.body;

  if (!name || !model || !year || !dealer || !price) {
    return res.status(400).json({ msg: "send all the deatails" });
  }

  const CarDetails = new Car({
    name,
    model,
    year,
    dealer,
    isBought: false,
    price,
  });

  CarDetails.save()
    .then((response) => {
      // If everything goes as planed
      //use the retured user document for something
      return res
        .status(200)
        .json({ msg: "Car saved Successfully :)", id: response._id });
    })
    .catch((error) => {
      //When there are errors We handle them here
      res.status(404).json({ msg: "Bad Request" });
    });
};

module.exports.allCars = async (req, res) => {
  const { dealerId } = req.body;

  const cars = await Car.find({ dealer: dealerId, isBought: false });

  if (cars.length === 0) {
    return res.status(401).json({ msg: "No cars found" });
  }
  return res.status(200).json(cars);
};
