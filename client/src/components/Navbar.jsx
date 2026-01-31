import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // ❌ Hide navbar on auth pages
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ✅ Detect Admin or Department routes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDepartmentRoute = location.pathname.startsWith("/department");

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-md">
      <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="text-white font-bold text-lg tracking-wide">
          ⚡ CIVICWATCH
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* 🔹 NORMAL USER NAV ONLY */}
          {!isAdminRoute && !isDepartmentRoute && (
            <>
              <NavLink to="/dashboard" className="text-white hover:text-blue-400">
                Dashboard
              </NavLink>

              <NavLink to="/issues" className="text-white hover:text-blue-400">
                Issues
              </NavLink>

              <NavLink to="/issues/new" className="text-white hover:text-blue-400">
                Report Issue
              </NavLink>

              <NavLink to="/account" className="text-white hover:text-blue-400">
                Account
              </NavLink>
            </>
          )}

          {/* 🔴 LOGOUT — FOR ALL */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
