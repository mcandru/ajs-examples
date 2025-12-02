import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import * as authStore from "@/stores/auth";
import authService from "@/services/auth";
import axios from "axios";

vi.mock("@/services/auth");

describe("Auth Store", () => {
  beforeEach(() => {
    authStore.isLoading.value = true;
    authStore.isLoggedIn.value = false;
    authStore.user.value = null;
    authStore.hasCheckedAuth.value = false;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("checkAuth", () => {
    test("sets authentication state when user is logged in", async () => {
      const mockResponse = {
        authenticated: true,
        user: {
          id: "123",
          email: "test@example.com",
          role: "user" as const,
        },
      };
      vi.mocked(authService.getProfile).mockResolvedValue(mockResponse);
      await authStore.checkAuth();

      expect(authStore.isLoggedIn.value).toBe(true);
      expect(authStore.user.value).toEqual(mockResponse.user);
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
    });
  });
});
