import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPortal() {
  const [enrollment, setEnrollment] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = async () => {
    if (!enrollment) {
      setError("❌ Please enter enrollment number");
      setStudent(null);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/students/${enrollment}`,
        { credentials: "include" }
      );
      if (!res.ok) {
        setStudent(null);
        setError("❌ Student not found");
        return;
      }
      const data = await res.json();
      setStudent(data);
      setError("");
      setStatus("");
    } catch (err) {
      console.error("❌ Fetch student error:", err);
      setError("❌ Error fetching student");
    }
  };

  const generateUpiLink = () =>
    student
      ? `upi://pay?pa=${encodeURIComponent(student.upiId || "test@upi")}&pn=${encodeURIComponent(
          student.name || "Unknown"
        )}&am=${student.feesDue || 0}&cu=INR`
      : "";

  const handlePayment = async () => {
    if (!student) return;

    try {
      const paymentBody = {
        studentId: student._id,
        enrollmentNo: student.enrollment,
        name: student.name,
        course: student.course || "N/A",
        amount: student.feesDue || 0,
        method: "UPI",
        status: "Success",
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentBody),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "❌ Backend rejected the payment");

      setStatus("✅ Payment request logged. Redirecting to UPI app...");

      setTimeout(() => {
        window.location.href = generateUpiLink();
      }, 1000);
    } catch (err) {
      console.error("❌ Payment logging error:", err);
      setStatus(`❌ Payment failed: ${err.message}`);
    }
  };

  return (
    <motion.div
      className="p-6 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">💳 Payment Portal</h1>

      <div className="flex gap-2 mb-6">
        <motion.input
          type="text"
          placeholder="Enter Enrollment Number"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          className="border p-2 rounded w-64 text-black"
        />
        <motion.button
          onClick={handleSearch}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Search
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p className="text-red-600">{error}</motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {student && (
          <motion.div className="p-4 border rounded-lg bg-white shadow space-y-4">
            <h2 className="text-black font-bold">{student.name}</h2>
            <p className="text-black"><strong>Enrollment:</strong> {student.enrollment}</p>
            <p className="text-black"><strong>Course:</strong> {student.course || "N/A"}</p>
            <p className="text-black"><strong>Year:</strong> {student.year || "N/A"}</p>
            <p className="text-red-600 font-semibold">Fees Due: ₹{student.feesDue || 0}</p>
            <p className="text-black"><strong>UPI ID:</strong> {student.upiId || "test@upi"}</p>

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                generateUpiLink()
              )}`}
              alt="UPI QR Code"
              className="w-48 h-48 mx-auto"
            />

            <motion.button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
            >
              Pay Now
            </motion.button>

            {status && <p className="mt-3 font-medium text-black">{status}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
