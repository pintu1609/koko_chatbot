
exports.detectAppointmentIntent = (text) => {
  return /appointment|schedule|vet visit/i.test(text);
};


exports.isCancelMessage=(text)=> {
  return /^(no|cancel|stop|exit)$/i.test(text.trim());
}