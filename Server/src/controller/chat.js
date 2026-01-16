const { responseHandler } = require("../middleware/response-handler");
const { chatService } = require("../service/chat");

exports.chat = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) {
      throw new BadRequest("sessionId and message are required");
    }
    const reply = await chatService(sessionId, message);
    return responseHandler({ reply }, res, "Chat response", 200);
  } catch (err) {
    return responseHandler(null, res, "Something went wrong", 500);
  }
};
