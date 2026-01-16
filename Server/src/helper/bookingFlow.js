const { isCancelMessage, } = require("../service/appointment");
const Appointment = require("../model/appointment");

 exports.handleBookingFlow =(convo, message)=> {

  if (isCancelMessage(message)) {
    convo.bookingState = null;
    convo.bookingData = {};
    return "Appointment booking cancelled. Let me know if you need anything else.";
  }

  switch (convo.bookingState) {
    case "ASK_OWNER_NAME":
      convo.bookingData.ownerName = message;
      convo.bookingState = "ASK_PET_NAME";
      return "What's your pet's name?";

    case "ASK_PET_NAME":
      convo.bookingData.petName = message;
      convo.bookingState = "ASK_PHONE";
      return "Please provide your phone number.";

    case "ASK_PHONE":
      convo.bookingData.phone = message;
      convo.bookingState = "ASK_DATETIME";
      return "What date and time would you prefer?";

    case "ASK_DATETIME":
      convo.bookingData.datetime = message;
      convo.bookingState = "CONFIRM";
      return `Please confirm:
Owner: ${convo.bookingData.ownerName}
Pet: ${convo.bookingData.petName}
Phone: ${convo.bookingData.phone}
Date: ${message}

Reply YES to confirm or NO to cancel.`;

    case "CONFIRM":
      if (/^yes$/i.test(message)) {
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
  }
}