import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("admin") === "true";
  const location = useLocation();

  // ❌ Hide navbar on login/register pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password"
  ) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="text-white font-bold text-lg">
          ⚡ CIVICWATCH
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/dashboard" className="text-white">Dashboard</NavLink>
              <NavLink to="/issues" className="text-white">Issues</NavLink>
              <NavLink to="/issues/new" className="text-white">Report Issue</NavLink>
              <NavLink to="/account" className="text-white">Account</NavLink>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
