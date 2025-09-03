// src/api/axios.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://souravian-university.onrender.com/api", // ✅ updated to Render backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ include cookies if your backend uses them
});

// Automatically attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
