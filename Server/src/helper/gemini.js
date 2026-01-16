const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1",
});

exports.askGemini = async (userMessage) => {
  try {
    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a veterinary assistant.
Only answer pet health, care, vaccination, diet, or illness questions.
If unrelated, politely refuse.

User: ${userMessage}
              `,
            },
          ],
        },
      ],
    });

    return result.text || "I couldn't generate a response. Please try again.";
  } catch (err) {
    console.error("Gemini Error:", err.status, err.message);

    if (err.status === 429) {
      return "The clinic has reached today's consultation limit. Please try again tomorrow.";
    }

    return "I'm having trouble answering right now. Please try again later.";
  }
};
