import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAdminDashboard } from "../../api/auth.api";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAdminDashboard();
      setData(res);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Admin API failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f6f6f6]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">Admin Panel</p>
              <h1 className="mt-2 text-3xl font-bold text-zinc-900">
                Control Center
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                Only admins can access this route.
              </p>
            </div>

            <span className="rounded-full bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 text-xs font-semibold">
              Admin Only
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Access Level</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">Admin ✅</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Purpose</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">RBAC Test</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-5">
              <p className="text-xs text-zinc-500">Status</p>
              <p className="mt-2 text-lg font-bold text-zinc-900">
                {loading ? "Loading..." : "Active"}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-950 p-5 text-white">
            <p className="text-sm font-semibold text-orange-300">
              Admin API Response
            </p>

            <div className="mt-3">
              {loading ? (
                <p className="text-sm text-zinc-300">Fetching admin data...</p>
              ) : (
                <pre className="text-xs text-zinc-200 whitespace-pre-wrap">
{JSON.stringify(data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
