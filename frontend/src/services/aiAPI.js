import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";

// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://studynotion3-6.onrender.com/api/v1";
export const ai = {
  CHAT_API: BASE_URL + "/ai/chat",
  ASK_API: BASE_URL + "/ai/ask",
};

/**
 * Send a message to the AI teacher
 * @param {string} userMessage - Student's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @param {string} token - Auth token
 * @returns {Promise<object>} AI response with userMessage and aiResponse
 */
export const sendAIMessage = async (userMessage, conversationHistory = [], token) => {
  try {
    if (!token) {
      console.error("No token provided");
      toast.error("Authentication required. Please login again.");
      return null;
    }

    const response = await apiConnector(
      "POST",
      ai.CHAT_API,
      {
        userMessage,
        conversationHistory,
      },
      {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );

    if (!response.data.success) {
      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        // Clear token and redirect to login
        localStorage.removeItem("token");
        typeof window !== "undefined" && (window.location.href = "/login");
        return null;
      }
      toast.error(response.data.message || "Failed to get AI response");
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error("Send AI Message Error:", error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      typeof window !== "undefined" && (window.location.href = "/login");
      return null;
    }
    
    toast.error("Error: Could not connect to your AI teacher. Please try again.");
    return null;
  }
};

/**
 * Ask a question to AI (one-shot, no history)
 * @param {string} question - Student's question
 * @param {string} token - Auth token
 * @returns {Promise<object>} Question and answer
 */
export const askAIQuestion = async (question, token) => {
  try {
    if (!token) {
      console.error("No token provided");
      toast.error("Authentication required. Please login again.");
      return null;
    }

    const response = await apiConnector(
      "POST",
      ai.ASK_API,
      {
        question,
      },
      {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );

    if (!response.data.success) {
      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        typeof window !== "undefined" && (window.location.href = "/login");
        return null;
      }
      toast.error(response.data.message || "Failed to get answer");
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error("Ask AI Question Error:", error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      typeof window !== "undefined" && (window.location.href = "/login");
      return null;
    }
    
    toast.error("Error: Could not connect to your AI teacher. Please try again.");
    return null;
  }
};
