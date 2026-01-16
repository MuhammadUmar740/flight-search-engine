import axios from "axios";
import { fetchToken } from "./auth";
import { API_BASE_URL } from "@/config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const res = await fetchToken();
      localStorage.setItem("token", res.access_token);
      localStorage.setItem(
        "token_expiry",
        (Date.now() + res.expires_in * 1000).toString()
      );

      error.config.headers.Authorization = `Bearer ${res.access_token}`;
      return apiClient(error.config);
    }
    return Promise.reject(error);
  }
);
