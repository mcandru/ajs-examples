import { ref } from "vue";
import {
  login as loginService,
  register as registerService,
  getProfile,
  logout as logoutService,
} from "@/services/auth";
import type { User } from "@/types";

export const isLoggedIn = ref(false);
export const user = ref<User | null>(null);
export const isLoading = ref(true); // Start as true to prevent race condition

export const checkAuth = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await getProfile();
    isLoggedIn.value = response.authenticated;
    user.value = response.user || null;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
  } finally {
    isLoading.value = false;
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await loginService(email, password);
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
    const response = await registerService(email, password);
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
  await logoutService();
  isLoggedIn.value = false;
  user.value = null;
};
