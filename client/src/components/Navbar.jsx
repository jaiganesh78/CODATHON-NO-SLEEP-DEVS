import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-wide">
          ⚡ Hackathon Starter
        </Link>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Register
              </Link>
              <Link
                to="/admin/login"
                className="px-3 py-2 rounded-xl border border-white/15 hover:bg-white/10 transition"
              >
                Admin
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/account"
                className="px-3 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Account
              </Link>

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl bg-red-500/90 hover:bg-red-500 transition font-semibold"
              >
                Logout
              </button>

              <div className="hidden sm:block text-sm text-slate-300 ml-2">
                {user?.email}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
