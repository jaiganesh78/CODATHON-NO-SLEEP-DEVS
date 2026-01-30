import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth.api";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success("OTP sent ✅ Check your email");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold">Forgot password</h2>
        <p className="text-slate-300 mt-2">
          We’ll send an OTP to reset your password.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
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
