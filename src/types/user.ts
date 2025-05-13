export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  about?: string;
  skills?: string[];
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}
