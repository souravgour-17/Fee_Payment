import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPortal() {
  const [enrollment, setEnrollment] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // Transaction feedback

  // Search student
  const handleSearch = async () => {
    if (!enrollment) {
      setError("❌ Please enter enrollment number");
      setStudent(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/students/${enrollment}`, {
        credentials: "include",
      });
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

  // Generate UPI link
  const generateUpiLink = () =>
    student
      ? `upi://pay?pa=${encodeURIComponent(student.upiId || "test@upi")}&pn=${encodeURIComponent(
          student.name || "Unknown"
        )}&am=${student.feesDue || 0}&cu=INR`
      : "";

  // Handle payment + transaction logging
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

      const res = await fetch("http://localhost:5000/api/payments", {
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


      {/* Search Section */}
      <div className="flex gap-2 mb-6">
        <motion.input
          type="text"
          placeholder="Enter Enrollment Number"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          className="border p-2 rounded w-64 text-black"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.button
          onClick={handleSearch}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            className="text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Student Card */}
      <AnimatePresence>
        {student && (
          <motion.div
            key="student-card"
            className="p-4 border rounded-lg bg-white shadow space-y-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-black font-bold">{student.name}</h2>
            <p className="text-black">
              <strong>Enrollment:</strong> {student.enrollment}
            </p>
            <p className="text-black">
              <strong>Course:</strong> {student.course || "N/A"}
            </p>
            <p className="text-black">
              <strong>Year:</strong> {student.year || "N/A"}
            </p>
            <p className="text-red-600 font-semibold">
              Fees Due: ₹{student.feesDue || 0}
            </p>
            <p className="text-black">
              <strong>UPI ID:</strong> {student.upiId || "test@upi"}
            </p>

            {/* QR Code */}
            <motion.div
              className="mt-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  generateUpiLink()
                )}`}
                alt="UPI QR Code"
                className="w-48 h-48 mx-auto"
              />
            </motion.div>

            {/* Pay Button */}
            <motion.button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: -2 }}
            >
              Pay Now
            </motion.button>

            {/* Transaction Feedback */}
            <AnimatePresence>
              {status && (
                <motion.p
                  key="status"
                  className="mt-3 font-medium text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
