import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Set up Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function getAIResponse(userInput) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent([userInput]);

        // Extract response text properly
        const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
        return reply;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I couldn't process your request.";
    }
}
// Chat API Route
app.post("/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await getAIResponse(message);
    res.json({ reply });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

