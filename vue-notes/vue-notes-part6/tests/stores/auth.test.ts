import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import * as authStore from "@/stores/auth";
import authService from "@/services/auth";

// Mock the auth service
// This will mock every exported function in the auth service module which is what we want
// for these tests because we want to control the responses of the service calls
vi.mock("@/services/auth");

describe("Auth Store", () => {
  beforeEach(() => {
    // Reset all store state before each test
    authStore.isLoggedIn.value = false;
    authStore.user.value = null;
    authStore.isLoading.value = true;
    authStore.hasCheckedAuth.value = false;
  });

  afterEach(() => {
    // Clears call history and removes mock implementations entirely
    vi.resetAllMocks();
  });

  describe("checkAuth", () => {
    test("sets authenticated state when user is logged in", async () => {
      const mockResponse = {
        authenticated: true,
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const, // Needed to be a valid user type
        },
      };

      // These mock return values are type safe so it will only allow you return a
      // mock value that is a valid getProfile() return type
      vi.mocked(authService.getProfile).mockResolvedValue(mockResponse);

      await authStore.checkAuth();

      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockResponse.user);
      expect(authStore.hasCheckedAuth.value).toBe(true);
      expect(authService.getProfile).toHaveBeenCalledOnce();
    });

    test("sets unauthenticated state when user is logged in", async () => {
      const mockResponse = {
        authenticated: false,
      };

      // These mock return values are type safe so it will only allow you return a
      // mock value that is a valid getProfile() return type
      vi.mocked(authService.getProfile).mockResolvedValue(mockResponse);

      await authStore.checkAuth();

      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBeNull();
      expect(authStore.hasCheckedAuth.value).toBe(true);
      expect(authService.getProfile).toHaveBeenCalledOnce();
    });

    test("handles 401 unauthorised error gracefully", async () => {
      const error = new axios.AxiosError();
      error.response = {
        status: 401,
        statusText: "Unauthorized",
        data: {},
        headers: {},
        config: {} as any,
      };
      vi.mocked(authService.getProfile).mockRejectedValue(error);

      await authStore.checkAuth();

      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
      expect(authStore.hasCheckedAuth.value).toBe(true);
    });
  });

  describe("login", () => {
    test("successfully logs in and sets user state", async () => {
      const mockResponse = {
        message: "Login successful",
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      await authStore.login("test@example.com", "password123");

      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockResponse.user);
      expect(authStore.isLoading.value).toBe(false);
      expect(authService.login).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    test("clears state and throws error on failed login", async () => {
      const error = new Error("Invalid credentials");
      vi.mocked(authService.login).mockRejectedValue(error);

      await expect(
        authStore.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Invalid credentials");
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
    });

    test("clears any existing user data before login", async () => {
      // First login as a valid user
      const mockResponse = {
        message: "Login successful",
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      await authStore.login("test@example.com", "password123");

      // Then login with an error
      const error = new Error("Invalid credentials");
      vi.mocked(authService.login).mockRejectedValue(error);

      await expect(
        authStore.login("test@example.com", "password123")
      ).rejects.toThrow("Invalid credentials");

      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoggedIn.value).toBe(false);
    });
  });

  describe("register", () => {
    test("successfully registers and sets user state", async () => {
      const mockResponse = {
        message: "Registration successful",
        user: {
          id: "456",
          email: "newuser@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.register).mockResolvedValue(mockResponse);

      await authStore.register("newuser@example.com", "Password123!");

      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockResponse.user);
      expect(authStore.isLoading.value).toBe(false);
      expect(authService.register).toHaveBeenCalledWith(
        "newuser@example.com",
        "Password123!"
      );
    });

    test("clears state and throws error on failed registration", async () => {
      const error = new Error("Email already exists");
      vi.mocked(authService.register).mockRejectedValue(error);

      await expect(
        authStore.register("existing@example.com", "Password123!")
      ).rejects.toThrow("Email already exists");
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
    });
  });

  describe("logout", () => {
    test("successfully logs out and clears user state", async () => {
      // First login as a valid user
      const mockResponse = {
        message: "Login successful",
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      await authStore.login("test@example.com", "password123");

      // Then logout
      vi.mocked(authService.logout).mockResolvedValue();
      await authStore.logout();

      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authService.logout).toHaveBeenCalledOnce();
    });

    test("does not clear state if logout service call fails", async () => {
      // First login as a valid user
      const mockResponse = {
        message: "Login successful",
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      await authStore.login("test@example.com", "password123");

      // Then cause logout to fail
      vi.mocked(authService.logout).mockRejectedValue(
        new Error("Network error")
      );

      await expect(authStore.logout()).rejects.toThrow("Network error");

      // State is not cleared because the service call failed
      // The logout function awaits the service call, so if it throws,
      // the state clearing code never runs
      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual({
        id: "123",
        email: "test@example.com",
        role: "user",
      });
    });
  });
});
