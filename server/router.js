const express = require("express");
const ParkingLot = require("./models/parkinglot");
const ParkingSpace = require("./models/parkingSpace");
const Router = express.Router();
const mongoose = require("mongoose");

Router.get("/", async (req, res) => {
  const parkingSpaces = await ParkingSpace.find();
  return res.send({ details: parkingSpaces });
});

Router.get("/view/:spaceName", async (req, res) => {
  const parkingSpaceName = req.params.spaceName;
  const parkingSpace = await ParkingSpace.findOne({ name: parkingSpaceName });

  const parkingSpaces = await ParkingLot.find({
    space: parkingSpace,
  }).populate("space");

  return res.json(parkingSpaces);
});

Router.post("/reserve/:spaceName/:lotNumber", async (req, res) => {
  const lotNumber = req.params.lotNumber;
  const parkingSpaceName = req.params.spaceName;
  const parkingSpace = await ParkingSpace.findOne({ name: parkingSpaceName });

  await ParkingLot.findOneAndUpdate(
    {
      space: parkingSpace,
      lotNumber,
    },
    { available: false }
  );

  return res.json(null);
});

module.exports = Router;
