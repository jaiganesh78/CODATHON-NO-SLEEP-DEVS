import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ HIDE NAVBAR ON AUTH PAGES
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  if (hideNavbar) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navBase =
    "px-3 py-2 rounded-xl transition font-medium";

  const active =
    "bg-orange-500 text-white shadow";

  const inactive =
    "text-white hover:bg-white/10";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/dashboard" className="font-bold text-white text-lg">
          ⚡ CIVICWATCH
        </NavLink>

        <div className="flex items-center gap-3">

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? active : inactive}`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-3 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? active : inactive}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/issues"
                end
                className={({ isActive }) =>
                  `${navBase} ${isActive ? active : inactive}`
                }
              >
                Issues
              </NavLink>

              <NavLink
                to="/issues/new"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? active : inactive}`
                }
              >
                Report Issue
              </NavLink>

              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? active : inactive}`
                }
              >
                Account
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300"
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>

              <span className="hidden sm:block text-sm text-slate-300 ml-2">
                {user?.email}
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
