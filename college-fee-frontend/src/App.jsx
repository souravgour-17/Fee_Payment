// src/App.jsx
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        {!user && <Route path="/login" element={<AuthPage />} />}
        {!user && <Route path="/register" element={<AuthPage />} />} 

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/fee-structure" element={<ProtectedRoute><FeeStructure /></ProtectedRoute>} />
            <Route path="/payment-portal" element={<ProtectedRoute><PaymentPortal /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
            <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={user ? <Home /> : <AuthPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function Layout() {
  const { user, logout } = useAuth();

  if (!user) return <AnimatedRoutes />;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white p-6 h-screen fixed top-0 left-0 flex flex-col shadow-lg">
        <h1 className="text-3xl font-bold mb-2">souravian Univ.</h1>
        <span className="italic text-sm mb-6">Fee Portal</span>

        <nav className="flex flex-col gap-3 flex-grow">
          {[{ to: "/", label: "Home" }, { to: "/about", label: "About" }, { to: "/fee-structure", label: "Fee Structure" }, { to: "/payment-portal", label: "Payment Portal" }, { to: "/students", label: "All Students" }, { to: "/payment-history", label: "Payment History" }, { to: "/contact", label: "Contact" }].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `py-2 px-4 rounded transition ${isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded">
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6">
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
