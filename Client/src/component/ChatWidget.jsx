import { useEffect, useState } from "react";
import { sendMessage } from "../api";

// const SESSION_ID = `session_${Date.now()}`;


const getSessionId = () => {
  let id = localStorage.getItem("vet_session_id");
  if (!id) {
    id = `session_${Date.now()}`;
    localStorage.setItem("vet_session_id", id);
  }
  return id;
};

const SESSION_ID = getSessionId();
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setError(null);

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const reply = await sendMessage(SESSION_ID, userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setError("Unable to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  setMessages([
    { role: "bot", text: "Hi! I can help with pet care or booking a vet visit." }
  ]);
}, []);

  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        🐶
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbox">
          <div className="chat-header">
            <span>Vet Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}

            {loading && <div className="msg bot">Typing...</div>}
            {error && <div className="msg error">{error}</div>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about your pet..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
