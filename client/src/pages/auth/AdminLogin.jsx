import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(form);

      if (data.user?.role !== "admin") {
        toast.error("Not an admin ❌");
        return navigate("/dashboard");
      }

      toast.success("Admin access granted ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Admin Sign in" subtitle="Restricted access. Admins only.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">Admin Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="admin@example.com"
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
            placeholder="••••••••"
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-60"
        >
          {loading ? "Entering..." : "Enter Admin Panel"}
        </button>

        <div className="flex justify-between text-sm text-zinc-600">
          <Link to="/login" className="hover:underline">
            User login →
          </Link>
          <Link to="/register" className="hover:underline">
            Create account →
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
