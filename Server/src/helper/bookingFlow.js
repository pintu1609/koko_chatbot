// const { isCancelMessage, } = require("../service/appointment");
// const Appointment = require("../model/appointment");




// const isValidPhone = (text) => {
//   const cleaned = text.replace(/\s+/g, "");
//   return /^[0-9]{10}$/.test(cleaned);
// };

// // const isValidDateTime = (text) => {
// //   if (!text || text.trim().length < 4) return false;
// //   if (/^[a-zA-Z]+$/.test(text.trim())) return false;
// //   return true;
// // };

// const isValidDateTime = (text) => {
//   if (!text) return false;

//   const value = text.toLowerCase().trim();

//   // must contain a number
//   const hasNumber = /\d/.test(value);

//   // must contain a date/time hint
//   const hasDateHint =
//     /(am|pm|at|\/|-|:|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(
//       value
//     );

//   return hasNumber && hasDateHint;
// };


//  exports.handleBookingFlow =(convo, message)=> {

//   if (isCancelMessage(message)) {
//     convo.bookingState = null;
//     convo.bookingData = {};
//     return "Appointment booking cancelled. Let me know if you need anything else.";
//   }

//   switch (convo.bookingState) {
//     case "ASK_OWNER_NAME":
//       convo.bookingData.ownerName = message.trim();
//       convo.bookingState = "ASK_PET_NAME";
//       return "What's your pet's name?";

//     case "ASK_PET_NAME":
//       convo.bookingData.petName = message.trim();
//       convo.bookingState = "ASK_PHONE";
//       return "Please provide your phone number.";

//     case "ASK_PHONE":
//       if (!isValidPhone(message)) {
//         return "Please enter a valid phone number (10 digits numbers only).";
//       }
//       convo.bookingData.phone = message.trim();
//       convo.bookingState = "ASK_DATETIME";
//       return "What date and time would you prefer?";

//     case "ASK_DATETIME":
//       if (!isValidDateTime(message)) {
//         return "Please provide a valid date and time (for example: 20 Feb at 11 AM).";
//       }
//       convo.bookingData.datetime = message.trim();
//       convo.bookingState = "CONFIRM";
//       return `Please confirm:
// Owner: ${convo.bookingData.ownerName}
// Pet: ${convo.bookingData.petName}
// Phone: ${convo.bookingData.phone}
// Date: ${message}

// Reply YES to confirm or NO to cancel.`;

//     case "CONFIRM":
//       if (/^yes$/i.test(message.trim())) {
//         Appointment.create({
//           sessionId: convo.sessionId,
//           ...convo.bookingData
//         });

//         convo.bookingState = null;
//         convo.bookingData = {};
//         return "✅ Your appointment has been booked successfully!";
//       }

//       convo.bookingState = null;
//       convo.bookingData = {};
//       return "❌ Appointment cancelled.";

//       default:
//       convo.bookingState = null;
//       convo.bookingData = {};
//       return "Something went wrong. Let's start again.";
//   }
// }

const Appointment = require("../model/appointment");
const { BOOKING_STATES } = require("./bookingStates");
const { isCancelMessage, looksLikeCancel } = require("../service/appointment");

const isValidPhone = (text) => /^[0-9]{10}$/.test(text.trim());

const isValidDateTime = (text) => {
  if (!text) return false;
  const v = text.toLowerCase();
  return /\d/.test(v) &&
    /(am|pm|at|\/|-|:|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(v);
};

exports.handleBookingFlow = async (convo, message) => {
  const input = message.trim();

  // GLOBAL CANCEL
  if (isCancelMessage(input)) {
    convo.bookingState = BOOKING_STATES.IDLE;
    convo.bookingData = {};
    return "Okay, I’ve cancelled the appointment booking.";
  }

  switch (convo.bookingState) {
    case BOOKING_STATES.OWNER:
      if (looksLikeCancel(input)) {
        convo.bookingState = BOOKING_STATES.IDLE;
        convo.bookingData = {};
        return "Okay, booking cancelled.";
      }
      convo.bookingData.ownerName = input;
      convo.bookingState = BOOKING_STATES.PET;
      return "What's your pet's name?";

    case BOOKING_STATES.PET:
      if (looksLikeCancel(input)) {
        convo.bookingState = BOOKING_STATES.IDLE;
        convo.bookingData = {};
        return "Okay, booking cancelled.";
      }
      convo.bookingData.petName = input;
      convo.bookingState = BOOKING_STATES.PHONE;
      return "Please provide your phone number (10 digits).";

    case BOOKING_STATES.PHONE:
      if (!isValidPhone(input)) {
        return "Please enter a valid phone number (10 digits, numbers only).";
      }
      convo.bookingData.phone = input;
      convo.bookingState = BOOKING_STATES.DATETIME;
      return "What date and time would you prefer?";

    case BOOKING_STATES.DATETIME:
      if (!isValidDateTime(input)) {
        return "Please provide a valid date and time (e.g., 20 Feb at 11 AM).";
      }
      convo.bookingData.datetime = input;
      convo.bookingState = BOOKING_STATES.CONFIRM;
      return `Please confirm:
Owner: ${convo.bookingData.ownerName}
Pet: ${convo.bookingData.petName}
Phone: ${convo.bookingData.phone}
Date: ${convo.bookingData.datetime}

Reply YES to confirm or NO to cancel.`;

    case BOOKING_STATES.CONFIRM:
      if (/^yes$/i.test(input)) {
        await Appointment.create({
          sessionId: convo.sessionId,
          ...convo.bookingData,
        });
        convo.bookingState = BOOKING_STATES.IDLE;
        convo.bookingData = {};
        return "✅ Your appointment has been booked successfully!";
      }
      convo.bookingState = BOOKING_STATES.IDLE;
      convo.bookingData = {};
      return "❌ Appointment cancelled.";

    default:
      convo.bookingState = BOOKING_STATES.IDLE;
      convo.bookingData = {};
      return "Something went wrong. Let's start again.";
  }
};
