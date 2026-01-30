import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ComplaintStatus from "../../components/complaintStatus";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-zinc-500 mt-1">
          You're signed in as {user?.email}
        </p>
      </div>
    {/* STATUS BAR */}
{user?.latestComplaint ? (
  <ComplaintStatus status={user.latestComplaint.status} />
) : (
  <div className="bg-white rounded-xl p-6 mb-8 shadow border text-center">
    <p className="text-gray-500">
      🚫 No complaints raised yet
    </p>
  </div>
)}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Raise Issue */}
        <div
          onClick={() => navigate("/issues/new")}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg hover:scale-[1.02] transition"
        >
          <h2 className="text-xl font-semibold mb-2">🚨 Raise a Complaint</h2>
          <p className="text-sm opacity-90">
            Report civic issues like garbage, potholes, water leakage, etc.
          </p>
        </div>

        {/* Community */}
        <div
          onClick={() => navigate("/issues")}
          className="cursor-pointer rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg hover:scale-[1.02] transition"
        >
          <h2 className="text-xl font-semibold mb-2">🌍 Community Issues</h2>
          <p className="text-sm opacity-90">
            View problems raised by others and track progress.
          </p>
        </div>

      </div>
    </div>
  );
}
