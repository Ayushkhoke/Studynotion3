const User = require("../models/User");
const { getAIResponse, getAIResponseWithHistory } = require("../utils/geminiHelper");

/**
 * Send a message to the AI chatbot and get a response
 * @route POST /api/v1/ai/chat
 * @access Private (Student only)
 */
exports.sendMessage = async (req, res) => {
  try {
    const { userMessage, conversationHistory } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get AI response
    let aiResponse;
    if (conversationHistory && conversationHistory.length > 0) {
      aiResponse = await getAIResponseWithHistory(userMessage, conversationHistory);
    } else {
      aiResponse = await getAIResponse(userMessage);
    }

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        userMessage,
        aiResponse,
      },
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting AI response",
      error: error.message,
    });
  }
};

/**
 * Get answer to a specific question using AI (one-shot, no history)
 * @route POST /api/v1/ai/ask
 * @access Private (Student only)
 */
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a question",
      });
    }

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get AI response
    const answer = await getAIResponse(question);

    return res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: {
        question,
        answer,
      },
    });
  } catch (error) {
    console.error("Ask Question Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting answer",
      error: error.message,
    });
  }
};
