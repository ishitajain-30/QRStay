export type UserRole = "main_admin" | "guest_admin" | "guest";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
