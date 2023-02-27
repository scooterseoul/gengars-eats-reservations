const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  discount: { type: String },
  address: { type: String },
  phone: { type: String },
  rating: { type: Number },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
