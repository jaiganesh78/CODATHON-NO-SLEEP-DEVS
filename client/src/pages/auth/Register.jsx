import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

import { registerUser, googleLogin } from "../../api/auth.api";
import { storage } from "../../utils/storage";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      toast.success("Account created successfully ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-500 to-green-500 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center text-slate-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-1">
          Civic Issue Reporting Portal
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={onChange}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            placeholder="Email Address"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative py-3">
            <div className="h-px bg-gray-300" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-3 text-sm text-gray-400">
              OR
            </span>
          </div>

          {/* Google Signup */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (res) => {
                try {
                  const data = await googleLogin(res.credential);
                  storage.setToken(data.token);
                  await loadUser();
                  toast.success("Signed up with Google ✅");
                  navigate("/dashboard");
                } catch (err) {
                  toast.error("Google signup failed");
                }
              }}
              onError={() => toast.error("Google signup failed")}
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
