import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import FeeStructure from "./pages/FeeStructure";
import PaymentPortal from "./pages/PaymentPortal";
import Contact from "./pages/Contact";
import StudentList from "./components/StudentList";
import PaymentHistory from "./pages/PaymentHistory";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/payment-portal" element={<PaymentPortal />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-red-900 text-white p-6 h-screen fixed top-0 left-0 flex flex-col shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Srinath Univ.</h1>
          <span className="italic text-sm mb-6">Fee Portal</span>

          <nav className="flex flex-col gap-3">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/fee-structure", label: "Fee Structure" },
              { to: "/payment-portal", label: "Payment Portal" },
              { to: "/students", label: "All Students" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `py-2 px-4 rounded transition ${
                    isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64 p-6">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}
