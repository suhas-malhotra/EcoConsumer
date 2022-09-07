const { Schema, model } = require("mongoose");
const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    Dealer: {
      type: String,
      required: true,
    },
    isBought: {
      type: Boolean,
      required: true,
      default: false,
    },
    Client: {
      type: String,
    },
  },
  { collection: "Car" }
);

module.exports = model("Car", carSchema);
