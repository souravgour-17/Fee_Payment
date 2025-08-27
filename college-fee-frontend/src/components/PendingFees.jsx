// src/components/PendingFees.jsx

import { useState, useEffect } from "react";
import studentService from "../services/studentService";
import { motion } from "framer-motion";

export default function PendingFees() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingStudents = async () => {
      try {
        const res = await studentService.getPendingFees();
        setStudents(res.data);
      } catch (err) {
        setError("Failed to fetch pending students.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingStudents();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        Students with Pending Fees
      </h2>
      {students.length === 0 ? (
        <p className="text-gray-600">No students have pending fees.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student._id}
              className="bg-gray-100 p-3 rounded-md border border-gray-200"
            >
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-gray-500">
                Enrollment: {student.enrollment}
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}