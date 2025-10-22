import { Router } from "express";
import axios from "axios";

const llmRouter = Router();

llmRouter.get("/models", async (_req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await axios.get(
    "https://generativelanguage.googleapis.com/v1beta/models",
    {
      headers: {
        "x-goog-api-key": apiKey,
      },
    }
  );

  // Filter for Gemini models
  const geminiModels = response.data.models.filter((model) =>
    model.name.includes("gemini")
  );

  res.json({
    models: geminiModels,
  });
});

llmRouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  try {
    // Make direct HTTP request to Gemini API
    // API key is sent in the header - NEVER expose this to the frontend!
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "x-goog-api-key": apiKey,
          "content-type": "application/json",
        },
      }
    );

    res.json({
      text: response.data.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to get response from AI",
    });
  }
});

export default llmRouter;
