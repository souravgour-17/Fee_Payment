// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const logo = "/university-logo.png";

export default function AuthPage() {
  const { user, setUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Agar user already login hai toh redirect to home
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegister && !confirmPassword)) {
      setError("Please fill all fields");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const endpoint = isRegister ? "/register" : "/login";

      const res = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: email }),
        credentials: "include", // ✅ important for cookies
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Auth failed");

      if (!isRegister) {
        // Login ke baad user set karo context me
        setUser(data.user);
        navigate("/"); // redirect home
      } else {
        // Register ke baad login tab karne ke liye Sign In pe switch
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900 to-black overflow-hidden">
      <div className="relative w-full max-w-md h-[620px] rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative z-10 h-full p-6 sm:p-8">
          <div className="w-full h-full rounded-2xl border border-white/20 bg-transparent px-6 py-6 flex flex-col">
            {/* Logo + Title */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 rounded-full mb-2 border border-white/30"
              />
              <h1 className="text-2xl font-bold text-white">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h1>
            </div>

            {/* Toggle Sign In / Sign Up */}
            <div className="flex justify-around mb-6">
              <button
                onClick={() => {
                  setIsRegister(false);
                  setError("");
                }}
                className={`px-4 py-2 text-lg font-semibold transition ${
                  !isRegister
                    ? "text-white border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsRegister(true);
                  setError("");
                }}
                className={`px-4 py-2 text-lg font-semibold transition ${
                  isRegister
                    ? "text-white border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isRegister && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-purple-600 text-white font-bold py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : isRegister
                  ? "Create Account"
                  : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
