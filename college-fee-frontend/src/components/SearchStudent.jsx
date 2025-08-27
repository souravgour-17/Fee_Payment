import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SearchStudent() {
  const [enrollment, setEnrollment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!enrollment.trim()) {
      alert("Please enter an enrollment number.");
      return;
    }

    setLoading(true);

    try {
      const BASE_URL = "http://localhost:5000";
      const res = await fetch(
        `${BASE_URL}/api/students/${encodeURIComponent(enrollment)}`
      );

      if (!res.ok) {
        throw new Error("Student not found.");
      }

      // ✅ If student exists, navigate to their overview page
      navigate(`/student/${encodeURIComponent(enrollment)}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.input
        type="text"
        placeholder="Enter Enrollment Number"
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
        className="w-full sm:w-auto flex-1 border rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-500"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button
        onClick={handleSearch}
        disabled={loading}
        className="rounded-2xl px-5 py-2 font-medium shadow bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              aria-label="loading"
            />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </motion.button>
    </motion.div>
  );
}
