import axios from "axios";
import type { User } from "@/types";
import api from "@/config/api";

// TypeScript is just for checking at compile time. If the server returns
// different data, you'll get a runtime error when you try to use it.
// You can use runtime validation libraries like Zod for that.
interface UserResponse {
  authenticated: boolean;
  user?: User;
}

interface LoginResponse {
  message: string;
  user: User;
}

const BASE_URL = "/api/auth";

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

const register = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/register`, {
    email,
    password,
  });
  return response.data;
};

const getProfile = async (): Promise<UserResponse> => {
  try {
    const response = await api.get(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return error.response.data;
    }
    throw error;
  }
};

const logout = async (): Promise<void> => {
  await api.post(`${BASE_URL}/logout`);
};

export default { login, register, getProfile, logout };
