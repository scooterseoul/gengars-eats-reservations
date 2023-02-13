const mongoose = require("mongoose");
const { Schema } = mongoose;
/* Changed date: type from string to Date */
const reservationSchema = new Schema({
  partySize: { type: Number, required: true },
  date: { type: Date, required: true },
  restaurantName: { type: String, required: true },
  userId: { type: String, required: true },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
