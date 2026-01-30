import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f6f6f6]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-zinc-900">
              Welcome, {user?.name || "User"} 👋
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              You’re signed in as <span className="font-semibold">{user?.email}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/account"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 transition"
            >
              Account
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Role</p>
            <p className="mt-2 text-lg font-bold text-zinc-900">{user?.role}</p>
          </div>

          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Provider</p>
            <p className="mt-2 text-lg font-bold text-zinc-900">{user?.provider}</p>
          </div>

          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Status</p>
            <p className="mt-2 text-lg font-bold text-zinc-900">Authenticated ✅</p>
          </div>
        </div>

        {/* Main panel */}
        <div className="mt-6 rounded-3xl bg-white border border-zinc-200 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900">
                Ready for the hackathon module
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                This is where you’ll plug your problem statement features.
              </p>
            </div>

            <span className="rounded-full bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 text-xs font-semibold">
              Starter Ready
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-4">
              <p className="font-semibold text-zinc-900">Feature Module 1</p>
              <p className="text-sm text-zinc-600 mt-1">
                Add your first hackathon workflow here.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-4">
              <p className="font-semibold text-zinc-900">Feature Module 2</p>
              <p className="text-sm text-zinc-600 mt-1">
                Integrate APIs / DB actions cleanly.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] p-4">
              <p className="font-semibold text-zinc-900">Feature Module 3</p>
              <p className="text-sm text-zinc-600 mt-1">
                Build admin tools if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
