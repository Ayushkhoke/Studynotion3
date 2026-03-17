const express = require("express");
const router = express.Router();

const { sendMessage, askQuestion } = require("../controllers/AI");
const { auth, isStudent } = require("../middleware/auth");

// Route to send message to AI chatbot
router.post("/chat", auth, isStudent, sendMessage);

// Route to ask a question to AI
router.post("/ask", auth, isStudent, askQuestion);

module.exports = router;
