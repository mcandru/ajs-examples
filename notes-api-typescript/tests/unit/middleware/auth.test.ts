// Mock the User model so tests can replace its static methods with jest mocks
jest.mock("../../../models/user.js");

import { requireAuth } from "../../../middleware/auth.js";
import { User } from "../../../models/user.js";
import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

describe("Auth Middleware", () => {
  describe("requireAuth", () => {
    test("should call next() if user is authenticated", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const user = { _id: userId, email: "test@example.com" }; // Mock user object

      // Use the mocked findById function
      // Have to assign to a typed variable to access jest.Mocked
      const mockedUser = User as jest.Mocked<typeof User>;
      mockedUser.findById.mockResolvedValue(user);

      const req = { session: { userId } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      await requireAuth(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBe(user);
    });

    test("should throw UNAUTHORIZED if no session", async () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();
      // .rejects needed for async functions that throw
      await expect(requireAuth(req, res, next)).rejects.toThrow(
        "Authentication required"
      );
    });
  });
});
