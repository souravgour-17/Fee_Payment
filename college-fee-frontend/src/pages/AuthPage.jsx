import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../api/axios";

const logo = "/university-logo.png";

export default function AuthPage() {
  const { user, setUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(600);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    let interval;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegister && (!confirmPassword || !name))) {
      setError("Please fill all fields");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        await api.post("/auth/register", {
          name,
          email: email.toLowerCase(),
          password,
        });
        setOtpSent(true);
        setOtpTimer(600);
        setError("OTP sent to your email. Please verify.");
      } else {
        const res = await api.post("/auth/login", {
          email: email.toLowerCase(),
          password,
        });

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Enter OTP sent to your email");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/verify-otp", {
        email: email.toLowerCase(),
        otp,
      });

      setError("Email verified! You can now login.");
      setOtpSent(false);
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setIsRegister(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value.toLowerCase());

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">

      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 rounded-full mb-2 border border-white/30"
            />
            <h1 className="text-2xl font-bold italic text-white text-center">
              {otpSent ? "Verify OTP" : isRegister ? "Create Account" : "Welcome Back"}
            </h1>
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          {!otpSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={email}
                onChange={handleEmailChange}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-300 hover:text-white"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {isRegister && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-300 hover:text-white"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
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

              <div className="flex justify-around mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError("");
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setError("");
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="p-3 rounded-xl bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <p className="text-gray-300 text-sm text-center">
                OTP expires in {Math.floor(otpTimer / 60)}:
                {String(otpTimer % 60).padStart(2, "0")}
              </p>

              <button
                type="submit"
                disabled={loading || otpTimer <= 0}
                className="mt-2 bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
