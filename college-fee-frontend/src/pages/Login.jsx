import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      alert(`Login Successful! Welcome ${user.name}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* Background veil */}
      <div className="absolute inset-0 veil-gradient veil-noise veil-vignette"></div>

      <form
        onSubmit={handleSubmit}
        className="transparent-box w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center italic-text">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-4 py-2 rounded bg-white/30 backdrop-blur-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-4 py-2 rounded bg-white/30 backdrop-blur-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
