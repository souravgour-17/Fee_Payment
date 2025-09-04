// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // ✅ also check loading

  if (loading) {
    return <div>Loading...</div>; // ⏳ wait until auth check finishes
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
