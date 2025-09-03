// frontend/src/pages/PaymentHistory.jsx
import { useEffect, useState } from "react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payments", {
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

  if (loading)
    return <p className="text-center mt-10 text-black">⏳ Loading payments...</p>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        💳 Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left text-black">Transaction ID</th>
                <th className="px-4 py-2 text-left text-black">Enrollment No</th>
                <th className="px-4 py-2 text-left text-black">Name</th>
                <th className="px-4 py-2 text-left text-black">Course</th>
                <th className="px-4 py-2 text-left text-black">Amount</th>
                <th className="px-4 py-2 text-left text-black">Method</th>
                <th className="px-4 py-2 text-left text-black">Status</th>
                <th className="px-4 py-2 text-left text-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-black">{p.transactionId}</td>
                  <td className="px-4 py-2 text-black">{p.studentId?.enrollmentNo}</td>
                  <td className="px-4 py-2 text-black">{p.studentId?.name}</td>
                  <td className="px-4 py-2 text-black">{p.studentId?.course}</td>
                  <td className="px-4 py-2 font-semibold text-black">₹{p.amount}</td>
                  <td className="px-4 py-2 text-black">{p.method}</td>
                  <td
                    className={`px-4 py-2 font-bold ${
                      p.status === "Success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="px-4 py-2 text-black">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
