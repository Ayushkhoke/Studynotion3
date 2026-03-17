require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

(async () => {
  try {
    console.log("🔍 Testing Gemini API...");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const modelsToTest = [
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
    ];

    for (const modelName of modelsToTest) {
      console.log(`\n🧪 Testing ${modelName}...`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        console.log(`✅ ${modelName} WORKS!`);
        console.log(`   Sample: ${result.response.text().substring(0, 50)}`);
      } catch (error) {
        console.log(`❌ ${modelName} failed:`, error.message.substring(0, 80));
      }
    }

  } catch (error) {
    console.error("❌ Fatal Error:", error.message);
  }
})();
