import createApp from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("Notes API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test("should not create a new note without authentication", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/api/notes")
      .send({ title: "Test Note", content: "This is a test note." });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Authentication required");
  });
});
