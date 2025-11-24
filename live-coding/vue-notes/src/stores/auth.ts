import { ref } from "vue";
import axios from "axios";
import type { User } from "@/types/index";

export const isLoggedIn = ref(false);
export const user = ref<User | null>(null);

export const checkAuth = async () => {
  try {
    const response = await axios.get("/api/auth/me");
    isLoggedIn.value = response.data.authenticated;
    user.value = response.data.user || null;
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    isLoggedIn.value = true;
    user.value = response.data.user;
  } catch (error) {
    isLoggedIn.value = false;
  }
};

export const logout = async (): Promise<void> => {
  await axios.post("/api/auth/logout");
  isLoggedIn.value = false;
  user.value = null;
};
