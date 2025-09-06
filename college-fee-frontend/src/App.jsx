import { HashRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import FeeStructure from "./pages/FeeStructure";
import PaymentPortal from "./pages/PaymentPortal";
import Contact from "./pages/Contact";
import StudentList from "./components/StudentList";
import PaymentHistory from "./pages/PaymentHistory";
import Dashboard from "./pages/Dashboard";

import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AnimatedRoutes() {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center min-h-screen">Checking session...</div>;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <AuthPage />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/fee-structure" element={<ProtectedRoute><FeeStructure /></ProtectedRoute>} />
        <Route path="/payment-portal" element={<ProtectedRoute><PaymentPortal /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

        <Route path="*" element={user ? <Home /> : <AuthPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function Layout() {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!user) return <AnimatedRoutes />;

  return (
    <div className="flex">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gradient-to-b from-souravianPurple to-blue-400 text-white">
        <h1 className="text-xl font-bold">souravian Univ.</h1>
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="text-2xl font-bold">☰</button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 md:flex flex-col bg-gradient-to-b from-souravianPurple to-blue-400 text-white p-6 shadow-lg transform transition-transform duration-300
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h1 className="text-3xl font-bold mb-2 md:block hidden">souravian Univ.</h1>
        <span className="italic text-sm mb-6 md:block hidden">Fee Portal</span>

        <nav className="flex flex-col gap-3 flex-grow">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/fee-structure", label: "Fee Structure" },
            { to: "/payment-portal", label: "Payment Portal" },
            { to: "/students", label: "All Students" },
            { to: "/payment-history", label: "Payment History" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `py-2 px-4 rounded transition ${isActive ? "bg-souravianPurple font-bold" : "hover:bg-souravianPurple"}`
              }
              onClick={() => setMobileSidebarOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 mt-16 md:mt-0">
        <AnimatedRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
