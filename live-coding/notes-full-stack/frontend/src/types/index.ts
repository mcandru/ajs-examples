// Note types
export interface Note {
  id: string;
  content: string;
  important: boolean;
}

type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}
