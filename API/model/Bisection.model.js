
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bisectionSchema = new Schema({
  equation: { type: String, required: true ,trim: true , unique: true},
  xl: { type: String, required: true ,trim: true },
  xr: { type: String, required: true , trim: true },
});

const Bisection = mongoose.model('Bisection', bisectionSchema);

module.exports = Bisection;