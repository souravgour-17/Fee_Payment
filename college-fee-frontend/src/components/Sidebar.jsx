import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-srinathRed text-white w-64 p-6 h-screen fixed top-0 left-0 shadow-lg">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Srinath Univ.</h1>
        <p className="!text-white italic text-sm mt-1">Fee Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/fee-structure"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          Fee Structure
        </NavLink>
        <NavLink
          to="/payment"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          Payment Portal
        </NavLink>
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          All Students
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block py-2 px-4 rounded transition ${
              isActive ? "bg-srinathAccent font-bold" : "hover:bg-srinathAccent"
            }`
          }
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
}