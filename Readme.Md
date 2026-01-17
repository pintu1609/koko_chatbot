# 🐾 Veterinary Chatbot SDK (MERN Stack)

A website-integrable chatbot SDK that answers **veterinary-related questions** and supports **conversational veterinary appointment booking**.  
The chatbot is designed as a **plug-and-play widget** that can be embedded into any website and communicates with a Node.js backend powered by **Google Gemini API**.

---

## 📌 Overview

This project implements a veterinary chatbot that:
- Answers **generic pet health questions** using AI
- Guides users through **appointment booking via conversation**
- Stores **conversations and appointments** in MongoDB
- Can be embedded into any website using a **single script/widget**

The focus of this assignment is **system design, clean architecture, maintainability, and real-world engineering judgment**, not visual polish.

---

## 🎯 Objectives Achieved

- ✅ Plug-and-play chatbot UI
- ✅ AI-powered veterinary Q&A (Gemini)
- ✅ Conversational appointment booking flow
- ✅ MongoDB persistence for chats & appointments
- ✅ Clean separation of concerns (controller / service / helper)
- ✅ Graceful error & rate-limit handling

---

## 🛠 Tech Stack

### Frontend
- **React.js** (created using Vite)
- JavaScript
- CSS

### Backend

- **Node.js**
- **Express.js**

### Database
- **MongoDB**

### AI
- **Google Gemini API**

### Hosting
- Local development (deployment ready)

---

## 📦 Features

### 1️⃣ Chatbot SDK (Embeddable Widget)

- Floating chatbot widget (bottom-right)
- Expandable / collapsible UI
- No configuration required to start
- Ready to be embedded via script or iframe
- Supports optional contextual data (future-ready)

---

### 2️⃣ Chatbot UI

- Floating widget
- Chat history view
- Text input with submit button
- Loading indicator (`Typing…`)
- User-friendly error messages

> UI prioritizes **usability over visual polish**, as required.

---

### 3️⃣ AI-Powered Veterinary Q&A

- Uses **Google Gemini API**
- System prompt restricts answers to **veterinary topics only**
- Supported topics:
  - Pet care
  - Vaccinations
  - Diet & nutrition
  - Common illnesses
  - Preventive care
- Politely rejects non-veterinary questions

---

### 4️⃣ Conversational Appointment Booking

The chatbot automatically detects booking intent such as:
- “I want to book an appointment”
- “Schedule a vet visit”

#### Required Fields (collected step-by-step)
1. Pet Owner Name
2. Pet Name
3. Phone Number
4. Preferred Date & Time

#### Flow
- Asks for missing details one at a time
- Confirms all details before saving
- Supports **YES / NO / CANCEL**
- Stores appointment in MongoDB

---

### 5️⃣ Data Storage (MongoDB)

#### Conversations
- Session ID
- User & bot messages
- Timestamps
- Booking state

#### Appointments
- Appointment details
- Linked `sessionId`
- Created timestamp

> Multiple appointments per session are currently allowed and documented as a design choice.

---

## 🔌 Backend APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/v1/chat` | Send/receive chat messages |
| POST | `/api/v1/chat` | Appointment booking via conversation |

APIs follow proper **separation of concerns**:
- Controller → HTTP handling
- Service → business logic
- Helpers → reusable logic

---

## 🧠 Architecture Overview



---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd <repo-name>

## Backend Setup
cd Server
npm install


# Create .env file:

DATABASE_URL=
JWT_SECRET=
ACCESS_TOKEN_PRIVATE_KEY=
ACCESS_TOKEN_EXPIRY_DAY=
DB_STRING=
PORT=
GEMINI_API_KEY=

npm start

## Frontend Setup
cd Client
npm install

# Create .env file:
VITE_API_BASE_UR=

npm run dev

## Testing (cURL Example)

curl -X POST http://localhost:5500/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_001",
    "message": "What vaccinations does a puppy need?"
  }'

# Gemini API Quota Note

The project uses Gemini Free Tier, which has a limited number of daily requests.
When the quota is exceeded, the chatbot responds gracefully with a user-friendly message instead of failing.

This behavior is intentional and handled in code.

## Key Design Decisions & Trade-offs

React over Next.js: Lightweight and ideal for embeddable widgets.

Single chat endpoint: Simplifies conversational flow.

State machine for booking: Ensures deterministic appointment flow.

Graceful AI failure handling: Prevents poor UX during rate limits.

Admin panel excluded: Marked optional; documented as future improvement.

## Assumptions

Chat session represents a single user interaction

Phone number validation is basic

Appointments are informational (no calendar sync)

Authentication is out of scope

## Future Improvements

Admin dashboard for viewing appointments

Authentication for clinic staff

Appointment status management

Persistent chat history on frontend

Dockerized deployment

Rate-limit aware AI fallback / mock mode

## Assignment Status

✔ All mandatory requirements completed
✔ Clean architecture & maintainable code
✔ Real-world edge cases handled
✔ Ready for submission

## Author

Pintu Kumar
Full-Stack Developer (MERN)

## Final Note

This project prioritizes clarity, correctness, and thoughtful engineering decisions over over-engineering — exactly as requested in the assignment. 