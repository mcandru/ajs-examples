import axios from "axios";
import type { User } from "@/types";

interface LoginResponse {
  message: string;
  user: User;
}

interface UserResponse {
  authenticated: boolean;
  user?: User;
}

const BASE_URL = "/api/auth";

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

const register = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    email,
    password,
  });
  return response.data;
};

const getProfile = async (): Promise<UserResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/me`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return error.response.data;
    }
    throw error;
  }
};

const logout = async () => {
  await axios.post(`${BASE_URL}/logout`);
};

export default { login, register, getProfile, logout };
