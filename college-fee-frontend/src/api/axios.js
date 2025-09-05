import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔑 allows cookies (JWT refresh tokens, etc.)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 🔑 gets token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ adds Authorization header
  }
  return config;
});

export default api;
