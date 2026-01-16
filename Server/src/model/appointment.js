const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  sessionId: String,
  ownerName: String,
  petName: String,
  phone: String,
  datetime: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
