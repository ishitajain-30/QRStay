import API from "./apiConfig";
import type { LoginRequest, RegisterRequest } from "./types";

export const authApi = {
  login: async (data: LoginRequest) => {
    try {
      const response = await API.post("/users/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    try {
      const response = await API.post("/users/register", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
