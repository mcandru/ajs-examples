import axios from "axios";
import type { User } from "@/types";

interface LoginResponse {
  message: string;
  user: User;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

const register = () => {};

const getProfile = () => {};

const logout = () => {};

export default { login, register, getProfile, logout };
