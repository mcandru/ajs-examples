export interface Note {
  id: number;
  content: string;
  important: boolean;
}

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}
