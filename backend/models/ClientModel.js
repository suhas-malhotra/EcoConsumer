const { Schema, model } = require("mongoose");
const clientSchema = new Schema(
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
  { collection: "Client" }
);

module.exports = model("Client", clientSchema);
