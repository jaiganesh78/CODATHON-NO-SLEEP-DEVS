import { Link } from "react-router-dom";

export default function Home() {
  return (
    
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl">
        <p className="text-sm text-slate-400">Hackathon Auth Starter</p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-red-400">
  Tailwind Applied ✅
</h1>


        <p className="mt-4 text-slate-300 max-w-2xl">
          Manual login + JWT + Forgot Password OTP + Admin roles. You’re ready to
          plug in any hackathon problem statement without rebuilding auth again.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="rounded-2xl bg-white px-5 py-3 text-black font-semibold hover:bg-white/90 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-2xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/10 transition"
          >
            Create Account
          </Link>
          <Link
            to="/admin/login"
            className="rounded-2xl bg-emerald-400 px-5 py-3 text-black font-semibold hover:bg-emerald-300 transition"
          >
            Admin Login
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="font-semibold">JWT Auth</p>
            <p className="text-sm text-slate-400 mt-1">
              Secure protected routes using Bearer tokens.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="font-semibold">OTP Reset</p>
            <p className="text-sm text-slate-400 mt-1">
              Forgot password via email OTP using SendGrid.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="font-semibold">Admin Role</p>
            <p className="text-sm text-slate-400 mt-1">
              Admin-only routes powered by backend middleware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
