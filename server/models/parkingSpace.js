const mongoose = require("mongoose");

const ParkingSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lotCount: {
    type: Number,
    required: true,
    default: 1,
  },
});

const ParkingSpace = mongoose.model("ParkingSpace", ParkingSpaceSchema);
module.exports = ParkingSpace;
