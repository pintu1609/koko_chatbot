const { isCancelMessage, } = require("../service/appointment");
const Appointment = require("../model/appointment");



const isValidPhone = (text) => {
  const cleaned = text.replace(/\s+/g, "");
  return /^[0-9]{10}$/.test(cleaned);
};

// const isValidDateTime = (text) => {
//   if (!text || text.trim().length < 4) return false;
//   if (/^[a-zA-Z]+$/.test(text.trim())) return false;
//   return true;
// };

const isValidDateTime = (text) => {
  if (!text) return false;

  const value = text.toLowerCase().trim();

  // must contain a number
  const hasNumber = /\d/.test(value);

  // must contain a date/time hint
  const hasDateHint =
    /(am|pm|at|\/|-|:|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(
      value
    );

  return hasNumber && hasDateHint;
};


 exports.handleBookingFlow =(convo, message)=> {

  if (isCancelMessage(message)) {
    convo.bookingState = null;
    convo.bookingData = {};
    return "Appointment booking cancelled. Let me know if you need anything else.";
  }

  switch (convo.bookingState) {
    case "ASK_OWNER_NAME":
      convo.bookingData.ownerName = message.trim();
      convo.bookingState = "ASK_PET_NAME";
      return "What's your pet's name?";

    case "ASK_PET_NAME":
      convo.bookingData.petName = message.trim();
      convo.bookingState = "ASK_PHONE";
      return "Please provide your phone number.";

    case "ASK_PHONE":
      if (!isValidPhone(message)) {
        return "Please enter a valid phone number (10 digits numbers only).";
      }
      convo.bookingData.phone = message.trim();
      convo.bookingState = "ASK_DATETIME";
      return "What date and time would you prefer?";

    case "ASK_DATETIME":
      if (!isValidDateTime(message)) {
        return "Please provide a valid date and time (for example: 20 Feb at 11 AM).";
      }
      convo.bookingData.datetime = message.trim();
      convo.bookingState = "CONFIRM";
      return `Please confirm:
Owner: ${convo.bookingData.ownerName}
Pet: ${convo.bookingData.petName}
Phone: ${convo.bookingData.phone}
Date: ${message}

Reply YES to confirm or NO to cancel.`;

    case "CONFIRM":
      if (/^yes$/i.test(message.trim())) {
        Appointment.create({
          sessionId: convo.sessionId,
          ...convo.bookingData
        });

        convo.bookingState = null;
        convo.bookingData = {};
        return "✅ Your appointment has been booked successfully!";
      }

      convo.bookingState = null;
      convo.bookingData = {};
      return "❌ Appointment cancelled.";

      default:
      convo.bookingState = null;
      convo.bookingData = {};
      return "Something went wrong. Let's start again.";
  }
}