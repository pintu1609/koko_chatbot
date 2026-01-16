


const Conversation = require("../model/conversation");
const Appointment = require("../model/appointment");
const { askGemini } = require("../helper/gemini");
const { detectAppointmentIntent } = require("./appointment");
const { handleBookingFlow } = require("../helper/bookingFlow");

exports.chatService = async (sessionId, message ) => {

  let convo = await Conversation.findOne({ sessionId });
  if (!convo) {
    convo = await Conversation.create({
      sessionId,
      messages: [],
      bookingState: null,
      bookingData: {}
    });
  }

  convo.messages.push({
    role: "user",
    text: message,
    timestamp: new Date()
  });

  // ✅ 1. Handle appointment flow FIRST
  if (convo.bookingState) {
    const reply = handleBookingFlow(convo, message);
    convo.messages.push({ role: "bot", text: reply, timestamp: new Date() });
    await convo.save();
    return  reply;
  }

  // ✅ 2. Detect new appointment intent
  if (detectAppointmentIntent(message)) {
    convo.bookingState = "ASK_OWNER_NAME";
    await convo.save();
    return "Sure! What's your name?";
  }

  // ✅ 3. Normal veterinary AI
  const reply = await askGemini(message);
  convo.messages.push({ role: "bot", text: reply, timestamp: new Date() });
  await convo.save();

  return reply;
};


