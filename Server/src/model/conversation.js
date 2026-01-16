const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  context: Object,

  messages: [
    {
      role: String,
      text: String,
      timestamp: Date
    }
  ],

  bookingState: {
    type: String,
    default: null
  },

  bookingData: {
    ownerName: String,
    petName: String,
    phone: String,
    datetime: String
  }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
