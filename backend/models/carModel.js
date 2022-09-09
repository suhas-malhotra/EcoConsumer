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
    price: {
      type: Number,
      required: true,
    },
    dealer: {
      type: String,
      required: true,
    },
    isBought: {
      type: Boolean,
      required: true,
      default: false,
    },
    client: {
      type: String,
    },
  },
  { collection: "Car" }
);

module.exports = model("Car", carSchema);
