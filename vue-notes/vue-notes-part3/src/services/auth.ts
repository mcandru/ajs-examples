import axios from "axios";
import type { User } from "@/types";

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

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("http://localhost:5173/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("http://localhost:5173/api/auth/register", {
    email,
    password,
  });
  return response.data;
};

export const getProfile = async (): Promise<UserResponse> => {
  try {
    const response = await axios.get("http://localhost:5173/api/auth/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return error.response.data;
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await axios.post("http://localhost:5173/api/auth/logout");
};
