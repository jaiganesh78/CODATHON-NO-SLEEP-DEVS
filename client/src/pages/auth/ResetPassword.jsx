import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../api/auth.api";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: location?.state?.email || "",
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(form);
      toast.success("Password reset ✅ Now login");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold">Reset password</h2>
        <p className="text-slate-300 mt-2">
          Enter OTP and set a new password.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">OTP</label>
            <input
              name="otp"
              value={form.otp}
              onChange={onChange}
              placeholder="6-digit OTP"
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">New Password</label>
            <input
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
              type="password"
              placeholder="Minimum 6 characters"
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              required
            />
          </div>

          <button
  disabled={loading}
  className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-60"
>
  {loading ? "Signing in..." : "Sign in"}
</button>


          <p className="text-sm text-slate-300">
            Back to{" "}
            <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
              Login →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
