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

  describe("GET /movies", () => {
    test("should require authentication", async () => {
      // TODO: Implement
      // Hint:
      // 1. Make a GET request to /movies without being logged in
      // 2. Assert that status is 401 with error message
      expect(true).toBe(true); // Placeholder assertion
    });

    test("should return empty array when user has no movies", async () => {
      // TODO: Implement
      // Hint:
      // 1. Register and login a user using request.agent(app)
      // 2. Make a GET request to /movies with the agent
      // 3. Assert status is 200
      expect(true).toBe(true); // Placeholder assertion
    });

    test("should return user's movies", async () => {
      // TODO: Implement
      // Hint:
      // 1. Register and login a user using request.agent(app)
      // 2. Create a couple of movies using POST /movies with the agent
      // 3. Make a GET request to /movies with the agent
      // 4. Assert status is 200 with the expected list of movies
      expect(true).toBe(true); // Placeholder assertion
    });

    test("should only return movies for the authenticated user", async () => {
      // TODO: Implement
      // Hint:
      // 1. Create two separate users (user1 and user2) using request.agent(app) for each
      // 2. Have user1 create a movie
      // 3. Have user2 create a different movie
      // 4. GET /movies as user1 - should only see user1's movie
      // 5. GET /movies as user2 - should only see user2's movie
      expect(true).toBe(true); // Placeholder assertion
    });
  });

  describe("POST /movies", () => {
    test("should require authentication", async () => {
      // TODO: Implement
      // Hint:
      // 1. Try to POST a movie without being logged in
      // 2. Assert status is 401 with error message
      expect(true).toBe(true); // Placeholder assertion
    });

    test("should create a movie with valid data", async () => {
      // TODO: Implement this test
      // Hint:
      // 1. Register and login a user using request.agent(app)
      // 2. POST to /movies with { title, year, watched, rating }
      // 3. Assert status is 201 with created movie data
      expect(true).toBe(true); // Placeholder assertion
    });

    test("should reject movie creation with missing required fields", async () => {
      // TODO: Implement this test
      // Hint:
      // 1. Register and login a user
      // 2. Try to POST a movie without title or without year
      // 3. Assert status is 400 with error message
      expect(true).toBe(true); // Placeholder assertion
    });
  });
});
