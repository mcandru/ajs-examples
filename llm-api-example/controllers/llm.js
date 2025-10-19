import { Router } from "express";
import axios from "axios";

const llmRouter = Router();

llmRouter.get("/models", async (_req, res) => {
  const response = await axios.get("https://api.anthropic.com/v1/models", {
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
  });

  res.json({
    models: response.data.data,
  });
});

llmRouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }

  try {
    // Make direct HTTP request to Claude API
    // API key is sent in the header - NEVER expose this to the frontend!
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
      }
    );

    res.json({
      text: response.data.content[0].text,
    });
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to get response from AI",
    });
  }
});

export default llmRouter;
