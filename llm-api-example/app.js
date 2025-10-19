import express from "express";
import llmRouter from "./controllers/llm.js";

const createApp = () => {
  const app = express();

  // Parse JSON request bodies
  app.use(express.json());

  // LLM API routes
  app.use("/api/chat", llmRouter);

  return app;
};

export default createApp;
