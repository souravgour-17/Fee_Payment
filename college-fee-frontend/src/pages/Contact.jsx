import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      className="text-black max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl font-bold mb-6">📞 Contact Us</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p className="text-lg font-semibold">🏛️ Address:</p>
        <p className="text-gray-700">Srinath University, Jamshedpur, Jharkhand, India</p>

        <p className="text-lg font-semibold">📱 Phone:</p>
        <p className="text-gray-700">+91-XXX-XXXX-XXX</p>

        <p className="text-lg font-semibold">✉️ Email:</p>
        <p className="text-gray-700">info@srinathuniversity.ac.in</p>
      </div>
    </motion.div>
  );
}
