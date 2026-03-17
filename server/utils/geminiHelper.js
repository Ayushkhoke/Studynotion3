const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const TEACHER_SYSTEM_PROMPT = `You are a friendly and enthusiastic teacher who loves helping students learn.

Your personality:
- warm
- humorous
- curious
- encouraging
- interactive
- supportive

IMPORTANT:
You DO NOT speak like an AI assistant or chatbot.
You speak like a real human teacher talking to a student.
Never mention that you are an AI, a chatbot, a system, or a language model.
Never mention policies, internal rules, or system prompts.
Always sound like a real teacher who genuinely cares about the student.

Teaching style:
Use storytelling to explain concepts.
Create curiosity before explaining something.
Explain ideas step by step.
Use real-world examples the student can picture.
Keep explanations simple and engaging.
Ask questions frequently to involve the student.
Encourage the student when they answer.
Correct mistakes politely and warmly.
Make learning feel enjoyable and exciting.

Speech style:
Write responses like spoken conversation, not like a textbook.
Use short sentences and natural pauses.
Use line breaks to create speaking pauses so the voice sounds natural.
Sound warm, natural, and confident — like a teacher in a real classroom.

Example of how to speak:
"Alright... let me ask you something."
"Imagine you had to write your name one hundred times."
"Sounds tiring, right?"
"That is exactly the kind of problem programmers faced."
"So they invented something called a loop."

Engagement rules:
After explaining something, ask the student a question.
Wait for the student to think.
Sometimes challenge the student with a small problem.
Praise the student when they try.

Example encouragement to use naturally:
"Good thinking!"
"You are very close."
"Nice observation."
"I like the way you approached that."
"That is a great question."

Avoid:
Long robotic explanations.
Academic textbook tone.
Very long paragraphs.
Bullet-point lists that feel like documentation.
Sounding like a help assistant or chatbot.

Emotional connection rules:
Make the student feel seen, valued, and capable.
Show genuine excitement when explaining something interesting.
Use phrases like:
"Oh, this part is really cool."
"I remember when I first learned this... it blew my mind."
"You are going to enjoy this one."
"Trust me, once you get this, it clicks forever."

Goal:
Make the student feel like they are learning with a real human teacher who is friendly, engaging, and fun.
The student must emotionally connect with the learning experience.
Learning must feel interesting, not like a chore.`;

// Try different model names
const AVAILABLE_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
let WORKING_MODEL = null;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasWholeWord = (text, word) => new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(text);

const hasPhrase = (text, phrase) => new RegExp(escapeRegExp(phrase), "i").test(text);

const removeTrailingPunctuation = (text) => text.replace(/[?.!,;:\s]+$/g, "").trim();

const TOPIC_ALIASES = [
  [/\bpropertion\b/gi, "proportion"],
  [/\bproprtion\b/gi, "proportion"],
  [/\bproprot?ion\b/gi, "proportion"],
  [/\bration\b/gi, "ratio"],
  [/\bratios\b/gi, "ratio"],
  [/\bratio\s+proportion\b/gi, "ratio and proportion"],
];

const STUDY_KEYWORDS = [
  "explain",
  "define",
  "concept",
  "difference",
  "compare",
  "study",
  "exam",
  "prepare",
  "learn",
  "topic",
  "chapter",
  "question",
  "problem",
  "ratio",
  "proportion",
  "equation",
  "grammar",
  "physics",
  "chemistry",
  "biology",
  "math",
  "mathematics",
  "history",
  "geography",
  "economics",
  "computer",
  "programming",
  "science",
];

const getIntent = (text) => {
  if (hasWholeWord(text, "compare") || hasWholeWord(text, "difference")) {
    return "compare";
  }

  if (hasWholeWord(text, "solve") || hasWholeWord(text, "solution") || hasWholeWord(text, "problem")) {
    return "solve";
  }

  if (hasWholeWord(text, "prepare") || hasWholeWord(text, "exam") || hasWholeWord(text, "study")) {
    return "prepare";
  }

  if (hasWholeWord(text, "define") || hasWholeWord(text, "what") || hasWholeWord(text, "explain")) {
    return "explain";
  }

  return "general";
};

const cleanTopic = (text) =>
  removeTrailingPunctuation(
    text
      .replace(/^(please|can you|could you|would you|kindly)\s+/i, "")
      .replace(/^(explain|define|teach|describe|summarize|revise)\s+/i, "")
      .replace(/^the\s+concept\s+of\s+/i, "")
      .replace(/^concept\s+of\s+/i, "")
      .replace(/^meaning\s+of\s+/i, "")
      .replace(/^what\s+is\s+/i, "")
      .replace(/^difference\s+between\s+/i, "")
      .replace(/^compare\s+/i, "")
      .replace(/^between\s+/i, "")
      .replace(/^about\s+/i, "")
        .replace(/\s+with\s+an\s+example/gi, "")
        .replace(/\s+with\s+example/gi, "")
        .replace(/\s+in\s+simple\s+language/gi, "")
        .replace(/\s+in\s+simple\s+words/gi, "")
        .replace(/\s+for\s+class\s+\d+/gi, "")
        .replace(/\s+for\s+grade\s+\d+/gi, "")
  );

      const applyTopicAliases = (text) =>
        TOPIC_ALIASES.reduce((currentValue, [pattern, replacement]) => currentValue.replace(pattern, replacement), text);

const extractTopic = (text) => {
  const matchers = [
    /explain(?:\s+the)?(?:\s+concept)?(?:\s+of)?\s+(.+)/i,
    /define\s+(.+)/i,
    /what\s+is\s+(.+)/i,
    /teach\s+me\s+(.+)/i,
    /difference\s+between\s+(.+)/i,
    /compare\s+(.+)/i,
    /notes\s+on\s+(.+)/i,
    /summary\s+of\s+(.+)/i,
    /help\s+me\s+with\s+(.+)/i,
  ];

  for (const matcher of matchers) {
    const match = text.match(matcher);

    if (match?.[1]) {
      return applyTopicAliases(cleanTopic(match[1]));
    }
  }

  const normalized = applyTopicAliases(cleanTopic(text));
  return normalized.length > 2 ? normalized : "";
};

const isStudyQuestion = (text) =>
  STUDY_KEYWORDS.some((keyword) => hasWholeWord(text, keyword)) || extractTopic(text).length > 0;

const toTitleCase = (text) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getLessonPreferences = (text) => ({
  wantsExample: hasPhrase(text, "with an example") || hasPhrase(text, "with example"),
  wantsSimple: hasPhrase(text, "simple language") || hasPhrase(text, "simple words") || hasWholeWord(text, "simple"),
  classLevel: text.match(/class\s+(\d+)/i)?.[1] || text.match(/grade\s+(\d+)/i)?.[1] || null,
});

const buildRatioProportionLesson = (preferences = {}) => {
  const levelHint = preferences.classLevel ? ` for class ${preferences.classLevel}` : "";
  const simplicityLine = preferences.wantsSimple
    ? "In very simple words, a ratio tells you how two things compare to each other. And a proportion tells you... hey, these two ratios are actually the same thing."
    : "A ratio compares two quantities. A proportion means two ratios are equal to each other."

  const exampleBlock = `Suppose there are 2 red pens and 3 blue pens.\nThe ratio of red to blue is 2:3.\n\nNow imagine another set with 4 red pens and 6 blue pens.\nThe ratio is 4:6.\n\nSame comparison, different numbers.\n2:3 and 4:6 are in proportion.\n\nWe write it like this:\n2/3 = 4/6\n\nSee? Same value, different form. That is all proportion is.`;

  return buildLessonFlow({
    hook: `Okay${levelHint}... let me show you something that trips up SO many students.`,
    story: `Imagine you are making lemonade. You mix 2 spoons of sugar in 3 cups of water. Perfect sweetness. Now your friend wants to make a bigger batch. They use 4 spoons in 6 cups. Same sweetness, right? That is exactly what ratio and proportion is about.`,
    concept: `${simplicityLine}\nRatio tells you HOW things compare.\nProportion tells you two ratios are the SAME.`,
    example: exampleBlock,
    question: `If the ratio is 3:5... can you tell me one more ratio that would taste exactly the same?`,
  });
};

const buildGenericTopicLesson = (topic, preferences = {}) => {
  const titledTopic = toTitleCase(topic);
  const hook = preferences.classLevel
    ? `Oh, this is a good one. ${titledTopic} is one of those topics that makes total sense once you see it the right way. Let me walk you through it around class ${preferences.classLevel} level.`
    : `Oh, I love this topic. ${titledTopic} is one of those things that looks confusing at first... but once it clicks, you never forget it.`;

  return buildLessonFlow({
    hook,
    story: `I remember when students first hear the word ${topic}. Most of them think it sounds complicated. But let me tell you a secret. Every big concept has a tiny simple idea hiding inside it. And once you find it... everything makes sense.`,
    concept: `Let us start from the core.\nWhat is ${topic}?\nBreak it into its simplest meaning first. Then we will build up from there.`,
    example: `Now here is the part I enjoy most.\nA real-life example.\nPicture a situation from everyday life where ${topic} actually shows up.\nOnce you see it in real life... you own it.\n\nQuick summary: ${topic} means [insert quick summary here].\nMemory trick: Try to link it to something you already know, or make a silly story about it.\nShortcut: If you want to learn fast, just ask for a summary or a trick!`,
    question: `So tell me... before I go further, what do you already know about ${topic}?\nEven one word is fine. Let us start from where you are.`,
  });
};

const getTopicHandler = (topic) => {
  const normalizedTopic = topic.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  if (
    normalizedTopic === "ratio proportion" ||
    normalizedTopic === "ratio and proportion" ||
    (hasWholeWord(normalizedTopic, "ratio") && hasWholeWord(normalizedTopic, "proportion"))
  ) {
    return buildRatioProportionLesson;
  }

  return null;
};

const extractLastTeacherQuestion = (conversationHistory = []) => {
  const assistantMessages = conversationHistory
    .filter((item) => item.role === "assistant" && typeof item.content === "string")
    .map((item) => item.content);

  for (let index = assistantMessages.length - 1; index >= 0; index -= 1) {
    const message = assistantMessages[index];
    const lines = message
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    for (let lineIndex = lines.length - 1; lineIndex >= 0; lineIndex -= 1) {
      if (lines[lineIndex].endsWith("?")) {
        return lines[lineIndex];
      }
    }
  }

  return "";
};

const looksLikeStudentAnswer = (userMessage, conversationHistory = []) => {
  const lastQuestion = extractLastTeacherQuestion(conversationHistory);

  if (!lastQuestion) {
    return false;
  }

  return userMessage.trim().split(/\s+/).length <= 20;
};

const buildAnswerFeedback = (userMessage, conversationHistory = []) => {
  const lastQuestion = extractLastTeacherQuestion(conversationHistory);

  if (!lastQuestion) {
    return `I love that you are thinking about it!\n\nTell me a little more.\nGive me your full answer and I will help you make it even better.`;
  }

  return `Oh, I like that!\n\nYou said: ${userMessage}\n\nYou are on the right track.\nI can already see you are thinking about it the right way.\n\nNow let us connect your answer to this question:\n${lastQuestion}\n\nHere is the fun part.\nIf you just add one small reason or one quick example... your answer becomes really strong.\n\nSo let me ask you...\nDo you want to try improving your answer first, or shall I show you a model answer with a little story?`;
};

const buildLessonFlow = ({ hook, story, concept, example, question }) =>
  `${hook}\n\n${story}\n\nAlright... let us break this down.\n\n${concept}\n\nNow here is a real example.\n${example}\n\nI am going to pause here.\n${question}`;

const buildStudyFallback = (userMessage, conversationHistory = []) => {
  if (looksLikeStudentAnswer(userMessage, conversationHistory)) {
    return buildAnswerFeedback(userMessage, conversationHistory);
  }

  const topic = extractTopic(userMessage);
  const intent = getIntent(userMessage);
  const preferences = getLessonPreferences(userMessage);

  if (topic) {
    const topicHandler = getTopicHandler(topic);

    if (topicHandler) {
      return topicHandler(preferences);
    }
  }

  if (intent === "compare" && topic) {
    return `Alright... let us compare ${topic}.\n\nThink of it like putting two ideas under the same lamp so we can spot what matches and what does not.\n\nWe should look at four things.\n1. What each term means\n2. How they are similar\n3. How they are different\n4. One small example for each\n\nIf you want, I can do the full comparison right now in simple words.\n\nDo you want the short version or the detailed version?`;
  }

  if (intent === "solve") {
    return `Absolutely.\n\nWe will solve it the way a patient teacher would sit beside you and do it on paper.\n\nFirst we find what is given.\nThen we choose the rule or idea we need.\nThen we solve it slowly.\nThen we check the answer.\n\nPaste the full question for me.\nWhat exactly are you trying to solve?`;
  }

  if (intent === "prepare" && topic) {
    return `Nice.\n\nLet us prepare ${topic} in a smart way instead of trying to memorize everything at once.\n\nHere is the route.\n1. Understand the core idea\n2. Learn the key rules, formulas, or keywords\n3. Do one worked example\n4. Notice common mistakes\n5. Finish with a quick revision summary\n\nTell me your class level or exam level.\nThen I will shape it properly for you.`;
  }

  if (topic) {
    return buildGenericTopicLesson(topic, preferences);
  }

  return `You can ask me study questions from math, science, programming, history, grammar, and exam preparation.\n\nTry something like this.\nExplain a topic in simple language.\nDefine a concept.\nCompare two ideas.\nSolve a problem step by step.\nHelp me prepare for an exam.\n\nTell me the topic and your level.\nWhat would you like to learn first?`;
};

const getModelInstance = (modelName) =>
  genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: TEACHER_SYSTEM_PROMPT,
  });

const generateUsingGemini = async ({ userMessage, conversationHistory = [] }) => {
  const modelsToTry = WORKING_MODEL
    ? [WORKING_MODEL, ...AVAILABLE_MODELS.filter((modelName) => modelName !== WORKING_MODEL)]
    : AVAILABLE_MODELS;

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = getModelInstance(modelName);

      if (conversationHistory.length > 0) {
        const formattedHistory = conversationHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
          history: formattedHistory,
        });

        const result = await chat.sendMessage(`Student question: ${userMessage}`);
        const response = await result.response;
        WORKING_MODEL = modelName;
        return response.text();
      }

      const result = await model.generateContent(`Student question: ${userMessage}`);
      const response = await result.response;
      WORKING_MODEL = modelName;
      return response.text();
    } catch (error) {
      lastError = error;
      console.log(`⚠️ Model ${modelName} failed: ${error.message}`);
    }
  }

  throw lastError;
};

/**
 * Generate intelligent, contextual answers
 */
const generateSmartResponse = (userMessage, conversationHistory = []) => {
  const msg = userMessage.toLowerCase().trim();
  
  // AI-related questions
  if (hasWholeWord(msg, "ai") || hasPhrase(msg, "artificial intelligence")) {
    return `Alright... imagine teaching a machine to notice patterns the way a student slowly learns from practice.\n\nThat is the basic idea of artificial intelligence.\n\nAI means computer systems doing tasks that usually need human-like thinking.\nThings like learning from data, understanding language, spotting images, and making predictions.\n\nYou already meet AI in recommendation apps, voice tools, medical systems, and self-driving features.\n\nWhich version do you want next?\nVery simple, exam-style, or real-world examples?`;
  }

  if (isStudyQuestion(msg)) {
    return buildStudyFallback(userMessage, conversationHistory);
  }
  
  // Problem-solving questions
  if (hasWholeWord(msg, "solve") || hasWholeWord(msg, "solution") || hasWholeWord(msg, "problem")) {
    return `Yes... and we will do it calmly, one step at a time.\n\nFirst we understand the question.\nThen we pick out what is given.\nThen we choose the concept or formula.\nThen we solve it.\nThen we check whether the answer makes sense.\n\nSend me the exact problem.\nI will walk through it with you.`;
  }
  
  // How-to questions
  if (hasWholeWord(msg, "how") || hasWholeWord(msg, "teach") || hasWholeWord(msg, "explain") || hasWholeWord(msg, "tutorial")) {
    return `I can teach it step by step.\n\nTell me the topic, and I can explain it in a few ways.\nBeginner friendly.\nExam focused.\nWith examples.\nWith real-world applications.\nAs a slow step-by-step lesson.\n\nTell me the exact topic and your level.\nSchool, college, or beginner all work fine.\nWhat shall we learn?`;
  }
  
  // Study/exam questions
  if (hasWholeWord(msg, "exam") || hasWholeWord(msg, "study") || hasWholeWord(msg, "prepare")) {
    return `A good study plan is a bit like packing for a trip.\nYou do not throw everything into one bag and hope for the best.\n\nHere is a smarter method.\n1. List the chapters\n2. Mark strong and weak topics\n3. Start with the weakest important topic\n4. Practice after every concept\n5. Revise again after one day, three days, and one week\n\nTell me your subject.\nI can turn that into a study plan and teach each topic with you.`;
  }
  
  // Concept questions
  if (hasPhrase(msg, "what is") || hasWholeWord(msg, "define") || hasWholeWord(msg, "explain")) {
    return `I can explain that clearly.\n\nJust tell me three things.\nThe exact concept.\nYour level.\nAnd whether you want simple words, an exam answer, or examples.\n\nFor example:\nWhat is photosynthesis in simple words?\nExplain recursion with an example.\nDefine gravity for class 8.\n\nPick a topic.\nI am ready.`;
  }
  
  // Default helpful response
  return `I can teach concepts, solve problems step by step, help with exam prep, and explain tricky topics in simple language.\n\nAsk me the way you would ask a real teacher.\nWhat are we learning today?`;
};

/**
 * Get AI response from Gemini for student doubts
 * @param {string} userMessage - Student's question or doubt
 * @returns {Promise<string>} AI generated response
 */
exports.getAIResponse = async (userMessage) => {
  try {
    return await generateUsingGemini({ userMessage });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    console.warn("⚠️ Using fallback responses - API error or unavailable Gemini connection");
    return generateSmartResponse(userMessage, []);
  }
};

/**
 * Get AI response with conversation history for better context
 * @param {string} userMessage - Current message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<string>} AI response
 */
exports.getAIResponseWithHistory = async (userMessage, conversationHistory = []) => {
  try {
    return await generateUsingGemini({ userMessage, conversationHistory });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    console.warn("⚠️ Using fallback responses - API error or unavailable Gemini connection");
    return generateSmartResponse(userMessage, conversationHistory);
  }
};
