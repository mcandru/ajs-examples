import type { Note } from "@/types";
import axios from "axios";

const BASE_URL = "http://localhost:5173/api/notes";

export const getAllNotes = async (): Promise<Note[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const createNote = async (
  content: string,
  important = false
): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}`, { content, important });
  return response.data;
};

export const removeNote = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
