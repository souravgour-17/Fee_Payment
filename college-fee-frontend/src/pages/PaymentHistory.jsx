import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="relative flex justify-center items-start min-h-screen py-10">
      <motion.div
        className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8 w-full max-w-6xl mx-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white italic">
          💳 Payment History
        </h2>

        {loading ? (
          <p className="text-center text-white">⏳ Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-white">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-white/40 text-center text-white">
              <thead className="bg-white/10 border-b border-white/40">
                <tr>
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Enrollment No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Course</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr
                    key={p._id}
                    className={`border-b border-white/20 ${
                      i % 2 === 0 ? "bg-white/10" : "bg-white/5"
                    }`}
                  >
                    <td className="px-4 py-2">{p.transactionId}</td>
                    <td className="px-4 py-2">{p.studentId?.enrollmentNo}</td>
                    <td className="px-4 py-2">{p.studentId?.name}</td>
                    <td className="px-4 py-2">{p.studentId?.course}</td>
                    <td className="px-4 py-2 font-semibold">₹{p.amount}</td>
                    <td className="px-4 py-2">{p.method}</td>
                    <td
                      className={`px-4 py-2 font-bold ${
                        p.status === "Success" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
