import { ref } from "vue";
import authService from "@/services/auth";
import type { User } from "@/types";

export const isLoggedIn = ref(false);
export const user = ref<User | null>(null);
export const isLoading = ref(true); // Start as true to prevent race condition

export const checkAuth = async (): Promise<boolean> => {
  // If already logged in, no need to check again
  if (isLoggedIn.value) {
    return true;
  }

  isLoading.value = true;
  try {
    const response = await authService.getProfile();
    isLoggedIn.value = response.authenticated;
    user.value = response.user || null;
    return isLoggedIn.value;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
    return false;
  } finally {
    isLoading.value = false;
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await authService.login(email, password);
    isLoggedIn.value = true;
    user.value = response.user;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
    throw error;
  } finally {
    isLoading.value = false;
  }
};

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await authService.register(email, password);
    isLoggedIn.value = true;
    user.value = response.user;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
    throw error;
  } finally {
    isLoading.value = false;
  }
};

export const logout = async (): Promise<void> => {
  await authService.logout();
  isLoggedIn.value = false;
  user.value = null;
};
