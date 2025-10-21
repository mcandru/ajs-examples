import createApp from "../../app.js";
import request from "supertest";
import User from "../../models/user.js";
import Movie from "../../models/movie.js";
import mongoose from "mongoose";

describe("Movies API", () => {
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
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  describe("POST /movies", () => {
    test("should require authentication", async () => {
      const response = await request(app).post("/movies").send({
        title: "All The President's Men",
        year: 1976,
      });
      expect(response.status).toBe(401);
    });

    test("should create a movie with valid data", async () => {
      const agent = request.agent(app);

      const register = await agent.post("/auth/register").send({
        name: "Michael",
        email: "michael@example.com",
        password: "password",
      });
      expect(register.status).toBe(201);

      const response = await agent
        .post("/movies")
        .send({ title: "All The President's Men", year: 1976 });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        title: "All The President's Men",
        year: 1976,
        watched: false,
      });
    });

    test("should reject movie creation with missing required fields", async () => {
      const agent = request.agent(app);

      const register = await agent.post("/auth/register").send({
        name: "Michael",
        email: "michael@example.com",
        password: "password",
      });
      expect(register.status).toBe(201);

      const response = await agent
        .post("/movies")
        .send({ title: "All The President's Men" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Missing movie information"
      );
    });
  });

  describe("GET /movies", () => {
    test("should require authentication", async () => {
      const response = await request(app).get("/movies");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Authentication required");
    });

    test("should return empty array when user has no movies", async () => {
      // TODO: Implement
      const agent = request.agent(app);
      const register = await agent.post("/auth/register").send({
        name: "Michael",
        email: "michael@example.com",
        password: "password",
      });
      expect(register.status).toBe(201);

      const response = await agent.get("/movies");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test("should return user's movies", async () => {
      const agent = request.agent(app);
      const register = await agent.post("/auth/register").send({
        name: "Michael",
        email: "michael@example.com",
        password: "password",
      });
      expect(register.status).toBe(201);

      const movies = [
        { name: "Iron Man", year: 2008 },
        { name: "All The President's Men", year: 1976 },
      ];

      for (const movie of movies) {
        const createResponse = await agent.post("/movies").send({
          title: movie.name,
          year: movie.year,
        });
        expect(createResponse.status).toBe(201);
      }

      const response = await agent.get("/movies");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("title", "Iron Man");
      expect(response.body[1]).toHaveProperty(
        "title",
        "All The President's Men"
      );
    });

    test("should only return movies for the authenticated user", async () => {
      const firstUserAgent = request.agent(app);

      // Create movies for first user
      await firstUserAgent.post("/auth/register").send({
        name: "Michael",
        email: "michael@example.com",
        password: "password",
      });

      await firstUserAgent.post("/movies").send({
        title: "Iron Man",
        year: 2008,
      });

      const secondUserAgent = request.agent(app);
      await secondUserAgent.post("/auth/register").send({
        name: "Alice",
        email: "alice@example.com",
        password: "password",
      });

      await secondUserAgent.post("/movies").send({
        title: "All The President's Men",
        year: 1976,
      });

      const firstUserMovies = await firstUserAgent.get("/movies");
      expect(firstUserMovies.status).toBe(200);
      expect(firstUserMovies.body.length).toBe(1);
      expect(firstUserMovies.body[0].title).toBe("Iron Man");

      const secondUserMovies = await secondUserAgent.get("/movies");
      expect(secondUserMovies.status).toBe(200);
      expect(secondUserMovies.body.length).toBe(1);
      expect(secondUserMovies.body[0].title).toBe("All The President's Men");
    });
  });
});
