import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

import AuthLayout from "../../components/AuthLayout";
import { registerUser, googleLogin } from "../../api/auth.api";
import { storage } from "../../utils/storage";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success("Account created ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Create your account in seconds.">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* ✅ Google Signup */}
        <div className="flex justify-center">
          <GoogleLogin
            text="signup_with"
            onSuccess={async (credentialResponse) => {
              try {
                const data = await googleLogin(credentialResponse.credential);

                storage.setToken(data.token);
                await loadUser();

                toast.success("Signed up with Google ✅");
                navigate("/dashboard");
              } catch (err) {
                toast.error(err?.response?.data?.message || "Google signup failed");
              }
            }}
            onError={() => toast.error("Google signup failed")}
          />
        </div>

        {/* divider */}
        <div className="relative py-2">
          <div className="h-px w-full bg-zinc-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-1 bg-white px-3 text-xs text-zinc-400">
            OR
          </span>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
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
            placeholder="Minimum 6 characters"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-zinc-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
