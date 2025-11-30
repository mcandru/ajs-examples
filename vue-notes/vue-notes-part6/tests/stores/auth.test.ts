import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import * as authStore from "@/stores/auth";
import authService from "@/services/auth";

// Mock the auth service
vi.mock("@/services/auth");

describe("Auth Store", () => {
  beforeEach(() => {
    // Reset all store state before each test
    authStore.isLoggedIn.value = false;
    authStore.user.value = null;
    authStore.isLoading.value = true;
    authStore.hasCheckedAuth.value = false;

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("checkAuth", () => {
    test("sets authenticated state when user is logged in", async () => {
      // Arrange
      const mockUser = {
        id: "123",
        email: "test@example.com",
        role: "user" as const,
      };
      const mockResponse = {
        authenticated: true,
        user: mockUser,
      };
      vi.mocked(authService.getProfile).mockResolvedValue(mockResponse);

      // Act
      await authStore.checkAuth();

      // Assert
      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockUser);
      expect(authStore.isLoading.value).toBe(false);
      expect(authStore.hasCheckedAuth.value).toBe(true);
      expect(authService.getProfile).toHaveBeenCalledOnce();
    });

    test("sets unauthenticated state when user is not logged in", async () => {
      // Arrange
      const mockResponse = {
        authenticated: false,
        user: undefined,
      };
      vi.mocked(authService.getProfile).mockResolvedValue(mockResponse);

      // Act
      await authStore.checkAuth();

      // Assert
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
      expect(authStore.hasCheckedAuth.value).toBe(true);
    });

    test("handles 401 unauthorized error gracefully", async () => {
      // Arrange
      const error = new axios.AxiosError(
        "Unauthorized",
        "401",
        undefined,
        undefined,
        {
          status: 401,
          statusText: "Unauthorized",
          data: {},
          headers: {},
          config: {} as any,
        }
      );
      vi.mocked(authService.getProfile).mockRejectedValue(error);

      // Act
      await authStore.checkAuth();

      // Assert
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
      expect(authStore.hasCheckedAuth.value).toBe(true);
    });

    test("throws error for non-401 errors", async () => {
      // Arrange
      const error = new axios.AxiosError(
        "Server Error",
        "500",
        undefined,
        undefined,
        {
          status: 500,
          statusText: "Internal Server Error",
          data: {},
          headers: {},
          config: {} as any,
        }
      );
      vi.mocked(authService.getProfile).mockRejectedValue(error);

      // Act & Assert
      await expect(authStore.checkAuth()).rejects.toThrow();
      expect(authStore.isLoading.value).toBe(false);
      expect(authStore.hasCheckedAuth.value).toBe(true);
    });

    test("sets isLoading to true at start and false at end", async () => {
      // Arrange
      authStore.isLoading.value = false; // Start with false
      const mockResponse = {
        authenticated: true,
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };

      let loadingDuringCall = false;
      vi.mocked(authService.getProfile).mockImplementation(async () => {
        loadingDuringCall = authStore.isLoading.value;
        return mockResponse;
      });

      // Act
      await authStore.checkAuth();

      // Assert
      expect(loadingDuringCall).toBe(true);
      expect(authStore.isLoading.value).toBe(false);
    });
  });

  describe("login", () => {
    test("successfully logs in and sets user state", async () => {
      // Arrange
      const mockUser = {
        id: "123",
        email: "test@example.com",
        role: "user" as const,
      };
      const mockResponse = {
        message: "Login successful",
        user: mockUser,
      };
      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      // Act
      await authStore.login("test@example.com", "password123");

      // Assert
      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockUser);
      expect(authStore.isLoading.value).toBe(false);
      expect(authService.login).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    test("clears state and throws error on failed login", async () => {
      // Arrange
      const error = new Error("Invalid credentials");
      vi.mocked(authService.login).mockRejectedValue(error);

      // Act & Assert
      await expect(
        authStore.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Invalid credentials");
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
    });

    test("sets isLoading to true during login and false after", async () => {
      // Arrange
      authStore.isLoading.value = false;
      const mockResponse = {
        message: "Login successful",
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };

      let loadingDuringCall = false;
      vi.mocked(authService.login).mockImplementation(async () => {
        loadingDuringCall = authStore.isLoading.value;
        return mockResponse;
      });

      // Act
      await authStore.login("test@example.com", "password123");

      // Assert
      expect(loadingDuringCall).toBe(true);
      expect(authStore.isLoading.value).toBe(false);
    });

    test("clears any existing user data before login", async () => {
      // Arrange
      authStore.user.value = {
        id: "old-user",
        email: "old@example.com",
        role: "admin",
      };
      const error = new Error("Invalid credentials");
      vi.mocked(authService.login).mockRejectedValue(error);

      // Act
      try {
        await authStore.login("test@example.com", "password123");
      } catch (e) {
        // Expected to throw
      }

      // Assert
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoggedIn.value).toBe(false);
    });
  });

  describe("register", () => {
    test("successfully registers and sets user state", async () => {
      // Arrange
      const mockUser = {
        id: "456",
        email: "newuser@example.com",
        role: "user" as const,
      };
      const mockResponse = {
        message: "Registration successful",
        user: mockUser,
      };
      vi.mocked(authService.register).mockResolvedValue(mockResponse);

      // Act
      await authStore.register("newuser@example.com", "Password123!");

      // Assert
      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockUser);
      expect(authStore.isLoading.value).toBe(false);
      expect(authService.register).toHaveBeenCalledWith(
        "newuser@example.com",
        "Password123!"
      );
    });

    test("clears state and throws error on failed registration", async () => {
      // Arrange
      const error = new Error("Email already exists");
      vi.mocked(authService.register).mockRejectedValue(error);

      // Act & Assert
      await expect(
        authStore.register("existing@example.com", "Password123!")
      ).rejects.toThrow("Email already exists");
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(false);
    });

    test("sets isLoading to true during registration and false after", async () => {
      // Arrange
      authStore.isLoading.value = false;
      const mockResponse = {
        message: "Registration successful",
        user: {
          id: "456",
          email: "newuser@example.com",
          role: "user" as const,
        },
      };

      let loadingDuringCall = false;
      vi.mocked(authService.register).mockImplementation(async () => {
        loadingDuringCall = authStore.isLoading.value;
        return mockResponse;
      });

      // Act
      await authStore.register("newuser@example.com", "Password123!");

      // Assert
      expect(loadingDuringCall).toBe(true);
      expect(authStore.isLoading.value).toBe(false);
    });
  });

  describe("logout", () => {
    test("successfully logs out and clears user state", async () => {
      // Arrange
      authStore.isLoggedIn.value = true;
      authStore.user.value = {
        id: "123",
        email: "test@example.com",
        role: "user",
      };
      vi.mocked(authService.logout).mockResolvedValue();

      // Act
      await authStore.logout();

      // Assert
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authService.logout).toHaveBeenCalledOnce();
    });

    test("does not clear state if logout service call fails", async () => {
      // Arrange
      authStore.isLoggedIn.value = true;
      authStore.user.value = {
        id: "123",
        email: "test@example.com",
        role: "user",
      };
      vi.mocked(authService.logout).mockRejectedValue(
        new Error("Network error")
      );

      // Act & Assert
      await expect(authStore.logout()).rejects.toThrow("Network error");

      // State is NOT cleared because the service call failed
      // The logout function awaits the service call, so if it throws,
      // the state clearing code never runs
      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual({
        id: "123",
        email: "test@example.com",
        role: "user",
      });
    });

    test("works correctly when already logged out", async () => {
      // Arrange
      authStore.isLoggedIn.value = false;
      authStore.user.value = null;
      vi.mocked(authService.logout).mockResolvedValue();

      // Act
      await authStore.logout();

      // Assert
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authService.logout).toHaveBeenCalledOnce();
    });
  });

  describe("initial state", () => {
    test("has correct default values", () => {
      // This test verifies the initial state after beforeEach reset
      expect(authStore.isLoggedIn.value).toBe(false);
      expect(authStore.user.value).toBe(null);
      expect(authStore.isLoading.value).toBe(true);
      expect(authStore.hasCheckedAuth.value).toBe(false);
    });
  });
});
