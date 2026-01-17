const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat`;

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
