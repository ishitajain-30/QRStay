import API from "./apiConfig";
import type { CreateHotelRequest, UpdateHotelRequest } from "./types";

export const hotelApi = {
  create: async (data: CreateHotelRequest) => {
    try {
      const response = await API.post("/hotels", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: UpdateHotelRequest) => {
    try {
      const response = await API.put(`/hotels/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await API.delete(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOne: async (id: string) => {
    try {
      const response = await API.get(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await API.get("/hotels");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
