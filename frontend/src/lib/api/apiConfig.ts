import axios from "axios";
import { getAuthToken } from "../auth";

const baseURL = "https://qrstay.onrender.com";
// const baseURL = "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use(
  function (config) {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    } else {
      console.warn("No authentication token found.");
    }
    return config;
  },
  function (error) {
    // Handle errors during request configuration
    return Promise.reject(error);
  }
);

export default API;
