import createApp from "../../app.js";
import request from "supertest";
import User from "../../models/user.js";
import Note from "../../models/note.js";
import mongoose from "mongoose";

// Helper function to create a user and return credentials
const createUser = async (email, password, role = "user") => {
  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ email, passwordHash, role });
  return { user, email, password };
};

// Helper function to create an authenticated agent (with session)
const createAuthenticatedAgent = async (app, email, password) => {
  const agent = request.agent(app);
  await agent.post("/api/auth/login").send({ email, password });
  return agent;
};

describe("Notes API", () => {
  let app;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    app = createApp();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Note.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.db.collection("sessions").deleteMany({});
  });

  test("should create a new note with authentication", async () => {
    // Create a test user
    const { email, password } = await createUser(
      "alice@example.com",
      "password123"
    );

    // Login and get authenticated agent
    const agent = await createAuthenticatedAgent(app, email, password);

    // Create a note
    const response = await agent
      .post("/api/notes")
      .send({ content: "Test note with auth", important: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("content", "Test note with auth");
    expect(response.body).toHaveProperty("important", true);
    expect(response.body).toHaveProperty("id");
  });

  test("should retrieve only the authenticated user's notes", async () => {
    // Create two users
    const user1 = await createUser("alice@example.com", "password123");
    const user2 = await createUser("bob@example.com", "password456");

    // Create notes for user 1
    const agent1 = await createAuthenticatedAgent(
      app,
      user1.email,
      user1.password
    );
    await agent1
      .post("/api/notes")
      .send({ content: "Alice's note 1", important: true });
    await agent1
      .post("/api/notes")
      .send({ content: "Alice's note 2", important: false });

    // Create notes for user 2
    const agent2 = await createAuthenticatedAgent(
      app,
      user2.email,
      user2.password
    );
    await agent2
      .post("/api/notes")
      .send({ content: "Bob's note 1", important: true });

    // Verify user 1 only sees their own notes
    const user1Response = await agent1.get("/api/notes");
    expect(user1Response.status).toBe(200);
    expect(user1Response.body).toHaveLength(2);
    expect(
      user1Response.body.every((note) => note.content.startsWith("Alice"))
    ).toBe(true);

    // Verify user 2 only sees their own notes
    const user2Response = await agent2.get("/api/notes");
    expect(user2Response.status).toBe(200);
    expect(user2Response.body).toHaveLength(1);
    expect(user2Response.body[0].content).toBe("Bob's note 1");
  });

  test("should delete a user's own note", async () => {
    // Create a user and note
    const { email, password } = await createUser(
      "alice@example.com",
      "password123"
    );
    const agent = await createAuthenticatedAgent(app, email, password);

    const createResponse = await agent
      .post("/api/notes")
      .send({ content: "Note to delete", important: false });
    const noteId = createResponse.body.id;

    // Delete the note
    const deleteResponse = await agent.delete(`/api/notes/${noteId}`);
    expect(deleteResponse.status).toBe(204);

    // Verify note is deleted
    const getResponse = await agent.get(`/api/notes/${noteId}`);
    expect(getResponse.status).toBe(404);
  });

  test("should not allow deleting another user's note", async () => {
    // Create two users
    const user1 = await createUser("alice@example.com", "password123");
    const user2 = await createUser("bob@example.com", "password456");

    // User 1 creates a note
    const agent1 = await createAuthenticatedAgent(
      app,
      user1.email,
      user1.password
    );
    const createResponse = await agent1
      .post("/api/notes")
      .send({ content: "Alice's private note", important: true });
    const noteId = createResponse.body.id;

    // User 2 tries to delete user 1's note
    const agent2 = await createAuthenticatedAgent(
      app,
      user2.email,
      user2.password
    );
    const deleteResponse = await agent2.delete(`/api/notes/${noteId}`);
    expect(deleteResponse.status).toBe(404);

    // Verify note still exists for user 1
    const getResponse = await agent1.get(`/api/notes/${noteId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.content).toBe("Alice's private note");
  });

  test("should return 400 for invalid note ID format", async () => {
    // Create a user
    const { email, password } = await createUser(
      "alice@example.com",
      "password123"
    );
    const agent = await createAuthenticatedAgent(app, email, password);
    const invalidId = "123-invalid-id";

    // Attempt to get a note with invalid ID
    const response = await agent.get(`/api/notes/${invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Note ID 'id' parameter must be a valid ObjectId"
    );
  });

  test("should return 404 for non-existent note ID", async () => {
    // Create a user
    const { email, password } = await createUser(
      "alice@example.com",
      "password123"
    );
    const agent = await createAuthenticatedAgent(app, email, password);
    const nonExistentId = "507f1f77bcf86cd799439012";

    // Attempt to get a note with non-existent ID
    const response = await agent.get(`/api/notes/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Could not find note");
  });

  describe("Authentication requirements", () => {
    test.each([
      ["GET", "/api/notes", null],
      ["GET", "/api/notes/507f1f77bcf86cd799439011", null],
      ["POST", "/api/notes", { content: "Test note", important: false }],
      ["DELETE", "/api/notes/507f1f77bcf86cd799439011", null],
    ])(
      "should require authentication for %s %s",
      async (method, path, body) => {
        const response = await request(app)
          [method.toLowerCase()](path)
          .send(body || {});

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Authentication required");
      }
    );
  });
});
