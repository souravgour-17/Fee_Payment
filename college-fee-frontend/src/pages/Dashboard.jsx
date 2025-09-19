// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="relative flex justify-center items-start min-h-screen py-10">
      <motion.div
        className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-4 text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold italic text-white">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-white/80 text-lg sm:text-xl">
          This is your fee payment dashboard. 💳 Manage your payments, check history, and stay updated with your enrollment details.
        </p>
        <p className="text-white/70">
          Explore features like <span className="font-semibold">Payment Portal</span>, <span className="font-semibold">Fee Structure</span>, and <span className="font-semibold">Payment History</span> all in one place. 📚✨
        </p>
      </motion.div>
    </div>
  );
}
