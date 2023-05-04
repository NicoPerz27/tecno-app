const { Schema, model } = require("mongoose");

const CreditSchema = new Schema({
  CC: {
    type: Number,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: true,
    trim: true,
  },
  letterurl: {
    type: String,
    require: true,
  },
  permissurl: {
    type: String,
    require: true,
  },
  credit: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  valueCuote: {
    type: Number,
    require: true,
  },
  cuotes: {
    type: Number,
    require: true,
  },
  sellername: {
    type: String,
    require: true,
    trim: true,
  },
  contactsell: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = model("Credit", CreditSchema);
