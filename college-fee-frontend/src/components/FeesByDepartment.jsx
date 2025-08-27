// src/components/FeesByDepartment.jsx

import { useState, useEffect } from "react";
import studentService from "../services/studentService";
import { motion } from "framer-motion";

export default function FeesByDepartment() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await studentService.getFeesByDepartment();
        setReport(res.data);
      } catch (err) {
        setError("Failed to fetch fees report.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-gray-500">Loading report...</div>;
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
        Total Fees by Department
      </h2>
      {report.length === 0 ? (
        <p className="text-gray-600">No fees data available.</p>
      ) : (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Total Fees Collected</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {report.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item._id}
                </td>
                <td className="py-3 px-6 text-left">
                  ${item.totalFees.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}