const express = require("express");
const ParkingLot = require("./models/parkinglot");
const Router = express.Router();

Router.get("/", async (req, res) => {
  const { space } = req.params;

  if (space) {
    const parkingSpaces = await ParkingLot.find({ space }).populate("space");
    return res.send({ details: parkingSpaces });
  }

  const parkingSpaces = await ParkingLot.find().populate("space");
  return res.send({ details: parkingSpaces });
});

module.exports = Router;
