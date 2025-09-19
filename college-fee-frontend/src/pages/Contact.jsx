import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="relative flex justify-center items-start min-h-screen py-10">
      <motion.div
        className="backdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-8 w-full max-w-3xl mx-4 text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold italic text-white">📞 Contact Us</h1>

        <div className="space-y-4 text-white/80">
          <div>
            <p className="text-lg font-semibold">🏛️ Address:</p>
            <p>Souravian University, Jamshedpur, Jharkhand, India</p>
          </div>

          <div>
            <p className="text-lg font-semibold">📱 Phone:</p>
            <p>+91-XXX-XXXX-XXX</p>
          </div>

          <div>
            <p className="text-lg font-semibold">✉️ Email:</p>
            <p>info@souravianuniversity.ac.in</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
