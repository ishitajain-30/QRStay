import { User, UserRole } from "@/types/auth";

export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case "main_admin":
      return "/admin";
    case "guest_admin":
      return "/guest-admin";
    case "guest":
      return "/guest";
    default:
      return "/";
  }
};
