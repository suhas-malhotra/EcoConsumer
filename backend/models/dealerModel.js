const { Schema, model } = require("mongoose");
const dealerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "Dealer" }
);

module.exports = model("Dealer", dealerSchema);
