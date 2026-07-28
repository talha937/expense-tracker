import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { email, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-[#332C29] text-[#FFC178]"
        : "text-[#B8ADA3] hover:text-[#F7F0EA]"
    }`;

  return (
    <div className="max-w-xl mx-auto flex justify-between items-center mb-6">
      <nav className="flex gap-1 bg-[#2A2422] border border-[#F7F0EA]/10 rounded-xl p-1">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/budgets" className={linkClass}>
          Budgets
        </NavLink>
      </nav>
      <button
        onClick={logout}
        className="text-xs text-[#B8ADA3] hover:text-[#E2574C] transition-colors"
      >
        log out ({email})
      </button>
    </div>
  );
}

export default NavBar;