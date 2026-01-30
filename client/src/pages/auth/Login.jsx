import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import googleIcon from "../../assets/google.png";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/auth.api";
import { storage } from "../../utils/storage";
import { toast } from "react-hot-toast";
export default function Login() {
  const { login, loadUser } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Enter your email and password to access your account."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-zinc-900 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
  disabled={loading}
  className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-60"
>
  {loading ? "Signing in..." : "Sign in"}
</button>


        <div className="relative py-2">
          <div className="h-px w-full bg-zinc-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-white px-3 text-xs text-zinc-400">
            OR
          </span>
        </div>

        {/* Google placeholder */}
       <div className="flex justify-center">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const data = await googleLogin(credentialResponse.credential);
        storage.setToken(data.token);
        await loadUser();
        toast.success("Google login success ✅");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Google login failed");
      }
    }}
    onError={() => toast.error("Google login failed")}
  />
</div>



        <p className="text-center text-sm text-zinc-600">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-zinc-900 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
