const Conversation = require("../model/conversation");
const { BOOKING_STATES } = require("../helper//bookingStates");
const { detectAppointmentIntent } = require("./appointment");
const { handleBookingFlow } = require("../helper/bookingFlow");
const { askGemini } = require("../helper/gemini");

exports.chatService = async (sessionId, message) => {
  let convo = await Conversation.findOne({ sessionId });

  if (!convo) {
    convo = await Conversation.create({
      sessionId,
      messages: [],
      bookingState: BOOKING_STATES.IDLE,
      bookingData: {},
    });
  }

  convo.messages.push({ role: "user", text: message, timestamp: new Date() });

  // Booking always has priority
  if (convo.bookingState !== BOOKING_STATES.IDLE) {
    const reply = await handleBookingFlow(convo, message);
    convo.messages.push({ role: "bot", text: reply, timestamp: new Date() });
    await convo.save();
    return reply;
  }

  // Prevent double booking
  if (detectAppointmentIntent(message)) {
    convo.bookingState = BOOKING_STATES.OWNER;
    await convo.save();
    return "Sure! What's your name?";
  }

  // AI fallback
  const reply = await askGemini(message);
  convo.messages.push({ role: "bot", text: reply, timestamp: new Date() });
  await convo.save();
  return reply;
};
