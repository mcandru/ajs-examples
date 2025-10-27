import { reactive } from "vue";
import {
  login as loginService,
  register as registerService,
  getProfile,
  logout as logoutService,
} from "@/services/auth";
import type { User } from "@/types";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

const state = reactive<AuthState>({
  isLoggedIn: false,
  user: null,
  isLoading: false,
});

export const authStore = {
  state,

  async checkAuth() {
    this.state.isLoading = true;
    try {
      const response = await getProfile();
      this.state.isLoggedIn = response.authenticated;
      this.state.user = response.user || null;
    } catch (error) {
      this.state.isLoggedIn = false;
      this.state.user = null;
      console.error("Error checking auth status:", error);
    } finally {
      this.state.isLoading = false;
    }
  },

  async login(email: string, password: string) {
    this.state.isLoading = true;
    try {
      const response = await loginService(email, password);
      this.state.isLoggedIn = true;
      this.state.user = response.user;
    } catch (error) {
      this.state.isLoggedIn = false;
      this.state.user = null;
      throw error;
    } finally {
      this.state.isLoading = false;
    }
  },

  async register(email: string, password: string) {
    this.state.isLoading = true;
    try {
      const response = await registerService(email, password);
      this.state.isLoggedIn = true;
      this.state.user = response.user;
    } catch (error) {
      this.state.isLoggedIn = false;
      this.state.user = null;
      throw error;
    } finally {
      this.state.isLoading = false;
    }
  },

  async logout() {
    await logoutService();
    this.state.isLoggedIn = false;
    this.state.user = null;
  },
};
