import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendAIMessage } from "../../../services/aiAPI";
import toast from "react-hot-toast";
import { AiOutlineSend, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdClear, MdMic, MdMicOff, MdRecordVoiceOver } from "react-icons/md";

const createMessage = (text, sender) => ({
  id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  text,
  sender,
  timestamp: new Date(),
});

const createGreeting = (firstName) => {
  const learnerName = firstName ? ` ${firstName}` : "";

  return createMessage(
    `Hey${learnerName}! Great to see you here.\n\nI am your teacher today... and trust me, we are going to have some fun.\n\nI love explaining things in a way that actually makes sense. No boring textbook stuff. Just real examples, good stories, and lots of questions.\n\nSo... what would you like to learn today?`,
    "ai"
  );
};

const getSpeechReadyText = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/\b\d+\./g, "")
    .replace(/:/g, ",")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .replace(/\s*([,.!?])\s*/g, "$1 ")
    .replace(/\s+/g, " ")
    .trim();

const PREFERRED_VOICE_HINTS = [
  "aria",
  "samantha",
  "serena",
  "jenny",
  "libby",
  "google us english",
  "google uk english",
  "microsoft",
  "en-us",
  "en-gb",
];

const getBestVoice = (voices = []) => {
  if (!voices.length) {
    return null;
  }

  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const candidateVoices = englishVoices.length ? englishVoices : voices;

  for (const hint of PREFERRED_VOICE_HINTS) {
    const preferredVoice = candidateVoices.find(
      (voice) =>
        voice.name?.toLowerCase().includes(hint) ||
        voice.voiceURI?.toLowerCase().includes(hint)
    );

    if (preferredVoice) {
      return preferredVoice;
    }
  }

  // Prefer non-local voices when available for smoother quality on supported browsers.
  const remoteVoice = candidateVoices.find((voice) => voice.localService === false);
  return remoteVoice || candidateVoices[0];
};

const splitIntoSpeechChunks = (text, maxLength = 220) => {
  if (!text) {
    return [];
  }

  const sentenceLikeParts = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const chunks = [];
  let buffer = "";

  sentenceLikeParts.forEach((part) => {
    const proposed = buffer ? `${buffer} ${part}` : part;

    if (proposed.length <= maxLength) {
      buffer = proposed;
      return;
    }

    if (buffer) {
      chunks.push(buffer);
      buffer = "";
    }

    if (part.length <= maxLength) {
      buffer = part;
      return;
    }

    // Hard split very long segments.
    for (let index = 0; index < part.length; index += maxLength) {
      chunks.push(part.slice(index, index + maxLength));
    }
  });

  if (buffer) {
    chunks.push(buffer);
  }

  return chunks;
};

const AIChatbot = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "";

  const [messages, setMessages] = useState([createGreeting(firstName)]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceModeEnabled, setVoiceModeEnabled] = useState(false);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(messages);
  const recognitionRef = useRef(null);
  const pendingTranscriptRef = useRef("");
  const messagesCountRef = useRef(messages.length);
  const autoSpeakRef = useRef(autoSpeakEnabled);
  const voiceModeRef = useRef(voiceModeEnabled);
  const isLoadingRef = useRef(isLoading);
  const isListeningRef = useRef(isListening);
  const tokenRef = useRef(token);
  const speakingRef = useRef(false);
  const resumeListeningAfterSpeechRef = useRef(false);
  const selectedVoiceRef = useRef(null);
  const submitMessageRef = useRef(async () => {});
  const hasGreetedOnOpenRef = useRef(false);
  const speechChunksRef = useRef([]);
  const speechTokenRef = useRef(0);

  // Example questions for quick access
  const exampleQuestions = [
    "What is photosynthesis?",
    "How do I solve this problem?",
    "Why is this concept important?",
    "Explain the difference between...",
    "How do I prepare for exams?",
    "Can you give me real-world examples?",
  ];

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messagesRef.current = messages;
    messagesCountRef.current = messages.length;
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    autoSpeakRef.current = autoSpeakEnabled;
  }, [autoSpeakEnabled]);

  useEffect(() => {
    voiceModeRef.current = voiceModeEnabled;
  }, [voiceModeEnabled]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    const greeting = createGreeting(firstName);

    setMessages((currentMessages) => {
      if (currentMessages.length !== 1 || currentMessages[0].sender !== "ai") {
        return currentMessages;
      }

      return [{ ...greeting, id: currentMessages[0].id, timestamp: currentMessages[0].timestamp }];
    });
  }, [firstName]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechApiAvailable = Boolean(window.speechSynthesis);

    setRecognitionSupported(Boolean(SpeechRecognition));
    setSpeechSupported(speechApiAvailable);

    if (speechApiAvailable) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        selectedVoiceRef.current = getBestVoice(voices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    if (!SpeechRecognition) {
      return () => {
        if (speechApiAvailable) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      pendingTranscriptRef.current = "";
      setInterimTranscript("");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let nextInterim = "";
      let nextFinal = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript || "";

        if (event.results[index].isFinal) {
          nextFinal += transcript;
        } else {
          nextInterim += transcript;
        }
      }

      if (nextFinal.trim()) {
        pendingTranscriptRef.current = `${pendingTranscriptRef.current} ${nextFinal}`.trim();
        setInputValue(pendingTranscriptRef.current);
      }

      setInterimTranscript(nextInterim.trim());
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        toast.error("Microphone permission is blocked in the browser.");
        return;
      }

      if (event.error !== "aborted") {
        toast.error("Voice input stopped. Please try again.");
      }
    };

    recognition.onend = async () => {
      setIsListening(false);
      setInterimTranscript("");

      const transcript = pendingTranscriptRef.current.trim();
      pendingTranscriptRef.current = "";

      if (!transcript || isLoadingRef.current) {
        return;
      }

      await submitMessageRef.current(transcript, { fromVoice: true });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      }

      if (speechApiAvailable) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    resumeListeningAfterSpeechRef.current = false;
    speakingRef.current = false;
    speechChunksRef.current = [];
    speechTokenRef.current += 1;
    window.speechSynthesis.cancel();
  };

  const finishSpeakingCycle = () => {
    speakingRef.current = false;
    speechChunksRef.current = [];

    if (resumeListeningAfterSpeechRef.current && voiceModeRef.current) {
      resumeListeningAfterSpeechRef.current = false;
      startListening();
      return;
    }

    resumeListeningAfterSpeechRef.current = false;
  };

  const speakReply = (text, { resumeListening = false } = {}) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const speechText = getSpeechReadyText(text);

    if (!speechText) {
      return;
    }

    const chunks = splitIntoSpeechChunks(speechText);

    if (!chunks.length) {
      return;
    }

    window.speechSynthesis.cancel();
    speechChunksRef.current = chunks;
    speechTokenRef.current += 1;
    const currentSpeechToken = speechTokenRef.current;

    speakingRef.current = true;
    resumeListeningAfterSpeechRef.current = resumeListening;

    const speakNextChunk = () => {
      if (currentSpeechToken !== speechTokenRef.current) {
        return;
      }

      const nextChunk = speechChunksRef.current.shift();

      if (!nextChunk) {
        finishSpeakingCycle();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(nextChunk);
      utterance.voice = selectedVoiceRef.current;
      utterance.lang = selectedVoiceRef.current?.lang || "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1.02;
      utterance.volume = 1;

      utterance.onend = () => {
        if (currentSpeechToken !== speechTokenRef.current) {
          return;
        }

        // Add a tiny pause between chunks for a more natural speaking rhythm.
        window.setTimeout(speakNextChunk, 120);
      };

      utterance.onerror = () => {
        if (currentSpeechToken !== speechTokenRef.current) {
          return;
        }

        finishSpeakingCycle();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  };

  async function submitMessage(messageText, options = {}) {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      toast.error("Please type a message");
      return;
    }

    if (!tokenRef.current) {
      toast.error("Please login first");
      return;
    }

    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.abort();
    }

    if (speakingRef.current) {
      stopSpeaking();
    }

    const conversationHistory = messagesRef.current
      .filter((message) => message.sender !== "ai" || messagesRef.current.indexOf(message) > 0)
      .map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));

    const userMessage = createMessage(trimmedMessage, "user");
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInputValue("");
    setInterimTranscript("");
    setIsLoading(true);

    try {
      const response = await sendAIMessage(trimmedMessage, conversationHistory, tokenRef.current);

      if (response?.aiResponse) {
        const aiMessage = createMessage(response.aiResponse, "ai");
        setMessages((currentMessages) => [...currentMessages, aiMessage]);

        const shouldSpeak = autoSpeakRef.current || options.fromVoice;

        if (shouldSpeak && speechSupported) {
          speakReply(response.aiResponse, {
            resumeListening: options.fromVoice && voiceModeRef.current,
          });
        }
      } else {
        toast.error("Failed to get AI response");

        if (options.fromVoice && voiceModeRef.current) {
          startListening();
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");

      if (options.fromVoice && voiceModeRef.current) {
        startListening();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    submitMessageRef.current = submitMessage;
  });

  useEffect(() => {
    if (!isExpanded) {
      hasGreetedOnOpenRef.current = false;
      return;
    }

    if (!speechSupported || hasGreetedOnOpenRef.current) {
      return;
    }

    hasGreetedOnOpenRef.current = true;

    const greetingTimeout = window.setTimeout(() => {
      speakReply(createGreeting(firstName).text);
    }, 250);

    return () => {
      window.clearTimeout(greetingTimeout);
    };
  }, [firstName, isExpanded, speechSupported]);

  const startListening = () => {
    if (!recognitionSupported || !recognitionRef.current) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }

    if (isLoadingRef.current) {
      return;
    }

    if (speakingRef.current) {
      stopSpeaking();
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      if (error.name !== "InvalidStateError") {
        toast.error("Could not start voice input.");
      }
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    recognitionRef.current.abort();
    setIsListening(false);
    setInterimTranscript("");
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    await submitMessage(inputValue, { fromVoice: false });
  };

  // Clear chat history
  const clearChat = () => {
    stopListening();
    stopSpeaking();
    setMessages([createGreeting(firstName)]);
    setInputValue("");
    setInterimTranscript("");
  };

  // Handle quick question click
  const handleQuickQuestion = (question) => {
    submitMessage(question, { fromVoice: false });
  };

  const handleVoiceModeToggle = () => {
    const nextValue = !voiceModeRef.current;
    setVoiceModeEnabled(nextValue);
    setAutoSpeakEnabled(nextValue ? true : autoSpeakRef.current);

    if (nextValue) {
      startListening();
    } else {
      stopListening();
      stopSpeaking();
    }
  };

  const handleCloseChatbot = () => {
    stopListening();
    stopSpeaking();
    hasGreetedOnOpenRef.current = false;
    setIsExpanded(false);
  };

  return (
    <div className="w-full">
      {/* Collapsed View */}
      {!isExpanded && (
        <div className="fixed bottom-6 right-6 z-40 md:bottom-6 md:right-6 sm:bottom-4 sm:right-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 animate-pulse text-base sm:text-sm sm:px-4 sm:py-2"
          >
            <span className="text-xl sm:text-lg">💬</span>
            <span className="sm:hidden">Ask Teacher</span>
            <span className="hidden sm:inline">Ask</span>
          </button>
        </div>
      )}

      {/* Expanded Teacher Panel */}
      {isExpanded && (
        <div className="fixed bottom-6 right-6 md:w-96 sm:w-[95vw] w-[95vw] max-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/30 flex flex-col z-50 overflow-hidden sm:bottom-4 sm:right-2">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold p-4 rounded-t-2xl flex justify-between items-center text-base sm:text-sm">
            <span className="flex items-center gap-2">
              <MdRecordVoiceOver size={20} />
              AI Teacher
            </span>
            <button
              onClick={handleCloseChatbot}
              className="bg-black/20 hover:bg-black/40 text-white px-2 py-1 rounded transition ml-2"
              title="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="border-b border-yellow-400/20 bg-black/30 px-4 py-3 text-xs text-gray-300 sm:px-2 sm:py-2">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleVoiceModeToggle}
                disabled={!recognitionSupported}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  voiceModeEnabled
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-200"
                } ${!recognitionSupported ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {voiceModeEnabled ? "Voice Tutor On" : "Voice Tutor Off"}
              </button>

              <button
                type="button"
                onClick={() => setAutoSpeakEnabled((currentValue) => !currentValue)}
                disabled={!speechSupported}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  autoSpeakEnabled
                    ? "bg-emerald-500 text-black"
                    : "bg-gray-800 text-gray-200"
                } ${!speechSupported ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {autoSpeakEnabled ? "Teacher Voice On" : "Teacher Voice Off"}
              </button>
            </div>

            <p className="mt-2 leading-relaxed text-gray-400">
              {recognitionSupported
                ? isListening
                  ? "Listening now. Speak naturally and I will send your question when you stop."
                  : "Use the mic to talk. In voice tutor mode, your teacher will answer aloud and then listen again."
                : "Voice input needs Chrome, Edge, or another browser with Web Speech API support."}
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:p-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed sm:max-w-[80vw] sm:px-2 sm:py-1 ${
                    message.sender === "user"
                      ? "bg-yellow-500 text-black rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none whitespace-pre-wrap"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {interimTranscript && (
              <div className="flex justify-end">
                <div className="max-w-xs rounded-lg rounded-br-none border border-dashed border-yellow-400/50 bg-black/30 px-4 py-2 text-sm text-yellow-100 sm:max-w-[80vw] sm:px-2 sm:py-1">
                  <p>{interimTranscript}</p>
                  <span className="mt-1 block text-xs opacity-70">Listening...</span>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none sm:px-2 sm:py-1">
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                </div>
              </div>
            )}

            {/* Quick Questions - Show only on first message */}
            {messages.length === 1 && !isLoading && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2 px-2">Try asking:</p>
                <div className="flex flex-wrap gap-2 sm:gap-1">
                  {exampleQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-gray-700 hover:bg-yellow-500 hover:text-black text-gray-200 px-3 py-1 rounded-full transition duration-200 whitespace-nowrap"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-700 p-4 bg-gray-900/50 sm:p-2"
            >
              <div className="flex gap-2 sm:gap-1">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={!recognitionSupported || isLoading}
                className={`rounded-lg px-3 transition ${
                  isListening
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                } ${!recognitionSupported || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MdMicOff className="text-xl" /> : <MdMic className="text-xl" />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? "Listening for your question..." : "Ask your teacher anything..."}
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-yellow-400 focus:outline-none text-sm placeholder-gray-400 sm:px-2 sm:py-1 sm:text-xs"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-lg transition sm:p-1 sm:text-xs ${
                  isLoading || !inputValue.trim()
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105 transform"
                }`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                ) : (
                  <AiOutlineSend className="text-xl" />
                )}
              </button>
            </div>
          </form>

          {/* Info Text */}
          <div className="border-t border-gray-700 px-4 py-2 text-center text-xs text-gray-400 bg-gray-900/50 rounded-b-2xl sm:px-2 sm:py-1">
            Teacher mode explains slowly, gives examples, and supports voice conversation.
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
