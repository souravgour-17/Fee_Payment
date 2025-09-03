import { NavLink, useNavigate } from "react-router-dom";
import { Home, Info, CreditCard, Users, FileText, Phone, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear JWT
    navigate("/login"); // ✅ redirect to login page
  };

  return (
    <div className="bg-gradient-to-b from-black via-purple-900 to-black text-white w-64 p-6 h-screen fixed top-0 left-0 shadow-xl flex flex-col">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide">My Portal</h1>
        <p className="italic text-sm text-white/70 mt-1">Student Dashboard</p>
        <div className="h-[2px] bg-white/30 mt-4" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 flex-1">
        <NavItem to="/" icon={<Home size={18} />} label="Home" />
        <NavItem to="/about" icon={<Info size={18} />} label="About" />
        <NavItem to="/fee-structure" icon={<FileText size={18} />} label="Fee Structure" />
        <NavItem to="/payment" icon={<CreditCard size={18} />} label="Payment Portal" />
        <NavItem to="/students" icon={<Users size={18} />} label="All Students" />
        <NavItem to="/history" icon={<FileText size={18} />} label="Payment History" />
        <NavItem to="/contact" icon={<Phone size={18} />} label="Contact" />
      </nav>

      {/* Footer / Logout */}
      <button
        onClick={handleLogout}
        className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

/* Reusable Nav Item Component */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-purple-800 font-semibold shadow-md"
            : "hover:bg-purple-600/80"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
