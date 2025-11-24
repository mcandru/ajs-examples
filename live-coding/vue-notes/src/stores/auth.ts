import { ref } from "vue";
import type { User } from "@/types/index";
import authService from "@/services/auth";

export const isLoggedIn = ref(false);
export const user = ref<User | null>(null);
export const hasCheckedAuth = ref(false);
export const isLoading = ref(false);

export const checkAuth = async () => {
  isLoading.value = true;
  try {
    const response = await authService.getProfile();
    isLoggedIn.value = response.authenticated;
    user.value = response.user || null;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
  } finally {
    isLoading.value = false;
    hasCheckedAuth.value = true;
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
  } finally {
    isLoading.value = false;
  }
};

export const logout = async (): Promise<void> => {
  await authService.logout();
  isLoggedIn.value = false;
  user.value = null;
};
