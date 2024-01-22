const mongoose = require("mongoose");

const ParkingLotSchema = new mongoose.Schema({
  space: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ParkingSpace",
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  lotNumber: Number,
});

const Lot = mongoose.model("Lot", ParkingLotSchema);
module.exports = Lot;
