import type { Note } from "@/types";
import axios from "axios";

const BASE_URL = "/api/notes";

const getAllNotes = async (): Promise<Note[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

const getNote = async (noteId: string): Promise<Note> => {
  const response = await axios.get(`${BASE_URL}/${noteId}`);
  return response.data;
};

const createNote = async (
  content: string,
  important = false
): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}`, { content, important });
  return response.data;
};

const updateNote = async (
  noteId: string,
  content: string,
  important: boolean
): Promise<Note> => {
  const response = await axios.put(`${BASE_URL}/${noteId}`, {
    content,
    important,
  });
  return response.data;
};

const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export default { getAllNotes, getNote, createNote, updateNote, deleteNote };
