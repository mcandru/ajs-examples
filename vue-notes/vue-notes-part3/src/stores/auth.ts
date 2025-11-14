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
  checkAuth: () => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

export default reactive<AuthState>({
  isLoggedIn: false,
  user: null,
  isLoading: false,

  async checkAuth() {
    this.isLoading = true;
    try {
      const response = await getProfile();
      this.isLoggedIn = response.authenticated;
      this.user = response.user || null;
    } catch (error) {
      this.isLoggedIn = false;
      this.user = null;
    } finally {
      this.isLoading = false;
    }
  },

  async login(email: string, password: string) {
    this.isLoading = true;
    try {
      const response = await loginService(email, password);
      this.isLoggedIn = true;
      this.user = response.user;
    } catch (error) {
      this.isLoggedIn = false;
      this.user = null;
      throw error;
    } finally {
      this.isLoading = false;
    }
  },

  async register(email: string, password: string) {
    this.isLoading = true;
    try {
      const response = await registerService(email, password);
      this.isLoggedIn = true;
      this.user = response.user;
    } catch (error) {
      this.isLoggedIn = false;
      this.user = null;
      throw error;
    } finally {
      this.isLoading = false;
    }
  },

  async logout() {
    await logoutService();
    this.isLoggedIn = false;
    this.user = null;
  },
});
