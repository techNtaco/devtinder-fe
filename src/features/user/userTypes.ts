export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  about?: string;
  photoUrl?: string;
  skills?: string[];
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  user: User | null;
}
