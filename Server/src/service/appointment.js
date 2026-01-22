
// exports.detectAppointmentIntent = (text) => {
//   return /appointment|schedule|vet visit/i.test(text);
// };


// exports.isCancelMessage=(text)=> {
//   return /^(no|cancel|stop|exit)$/i.test(text.trim());
// }

exports.detectAppointmentIntent = (text) =>
  /(book|appointment|schedule|vet visit)/i.test(text);

exports.isCancelMessage = (text) =>
  /(no|cancel|stop|exit|not now|never mind|actually no)/i.test(
    text.trim().toLowerCase()
  );

exports.looksLikeCancel = (text) =>
  /(cancel|stop|exit|not now|never mind|actually)/i.test(
    text.trim().toLowerCase()
  );
