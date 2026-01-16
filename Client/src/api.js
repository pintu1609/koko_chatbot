const API_URL = "http://localhost:5500/api/v1/chat";

export async function sendMessage(sessionId, message) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sessionId, message })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data.data.reply;
}
