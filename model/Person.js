const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: String,
  zip: Number,
  street: String,
});

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: String,
  address: [addressSchema],
});

module.exports = mongoose.model("person", personSchema);
