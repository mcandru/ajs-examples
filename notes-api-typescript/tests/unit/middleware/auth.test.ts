// Mock the User model so tests can replace its static methods with jest mocks
jest.mock("../../../models/user.js");

import { requireAuth } from "../../../middleware/auth.js";
import { User } from "../../../models/user.js";
import mongoose from "mongoose";

describe("Auth Middleware", () => {
  describe("requireAuth", () => {
    test("should call next() if user is authenticated", async () => {
      const userId = new mongoose.Types.ObjectId();
      const user = { _id: userId, email: "test@example.com" }; // Mock user object
      // Use the mocked findById function
      User.findById.mockResolvedValue(user);

      const req = { session: { userId } };
      const next = jest.fn();

      await requireAuth(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBe(user);
    });

    test("should throw UNAUTHORIZED if no session", async () => {
      const req = { session: null };
      const next = jest.fn();
      // .rejects needed for async functions that throw
      await expect(requireAuth(req, null, next)).rejects.toThrow(
        "Authentication required"
      );
    });
  });
});
