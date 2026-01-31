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
    // 🔴 ADMIN LOGIN
    if (
      form.email === "admin@hackathon.com" &&
      form.password === "Admin@123"
    ) {
      localStorage.setItem("role", "admin");
      toast.success("Admin login successful");
      window.location.href = "/admin/dashboard";
      return;
    }

    // 🟢 DEPARTMENT LOGIN
    if (
      form.email === "dept@hackathon.com" &&
      form.password === "Dept@123"
    ) {
      localStorage.setItem("role", "department");
      toast.success("Department login successful");
      window.location.href = "/department/dashboard";
      return;
    }

    // 🔵 NORMAL USER LOGIN
    await login(form);
    localStorage.setItem("role", "user");
    navigate("/dashboard");

  } catch (err) {
    toast.error("Invalid credentials");
  } finally {
    setLoading(false);
  }
};




return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-500 to-green-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center text-slate-800">
          Sign In
        </h2>

        <p className="text-center text-gray-500 mt-1">
          Access your civic dashboard
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            placeholder="Email address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative py-3">
            <div className="h-px bg-gray-300" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-3 text-sm text-gray-400">
              OR
            </span>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (res) => {
                try {
                  const data = await googleLogin(res.credential);
                  storage.setToken(data.token);
                  await loadUser();
                  toast.success("Google login successful ✅");
                  navigate("/dashboard");
                } catch {
                  toast.error("Google login failed");
                }
              }}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
