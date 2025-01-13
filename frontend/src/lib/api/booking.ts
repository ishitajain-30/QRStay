import API from "./apiConfig";
import type { CreateBookingRequest } from "./types";

export const bookingApi = {
  create: async (data: CreateBookingRequest) => {
    try {
      const response = await API.post("/bookings", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: Partial<CreateBookingRequest>) => {
    try {
      const response = await API.put(`/bookings/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await API.get("/bookings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
