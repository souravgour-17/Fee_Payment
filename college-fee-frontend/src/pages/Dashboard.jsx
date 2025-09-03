// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"} 👋</h1>
      <p className="mt-2 text-gray-600">This is your fee payment dashboard.</p>
    </div>
  );
}
