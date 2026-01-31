import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ComplaintStatus from "../../components/complaintStatus";

import Speedometer from "../../components/speedometer";


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
      <div className="bg-white rounded-xl p-6 mb-10 shadow border text-center">
        <p className="text-gray-500">
          🚫 No complaints raised yet
        </p>
      </div>
    )}

    {/* ACTION CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">

      {/* Raise Issue */}
      <div
        onClick={() => navigate("/issues/new")}
        className="cursor-pointer rounded-3xl 
        bg-gradient-to-r from-orange-500 to-orange-600 
        p-10 text-white shadow-xl 
        hover:scale-[1.03] transition min-h-[180px]"
      >
        <h2 className="text-2xl font-semibold mb-3">
          🚨 Raise a Complaint
        </h2>
        <p className="text-sm opacity-90 leading-relaxed">
          Report civic issues like garbage overflow, potholes, 
          streetlight failures, and water leakage instantly.
        </p>
      </div>

      {/* Community */}
      <div
        onClick={() => navigate("/issues")}
        className="cursor-pointer rounded-3xl 
        bg-gradient-to-r from-blue-500 to-blue-600 
        p-10 text-white shadow-xl 
        hover:scale-[1.03] transition min-h-[180px]"
      >
        <h2 className="text-2xl font-semibold mb-3">
          🌍 Community Issues
        </h2>
        <p className="text-sm opacity-90 leading-relaxed">
          Explore issues reported by others, track progress,
          and support your community by upvoting problems.
        </p>
      </div>
      {/* Live Map Card */}
<div
  onClick={() => navigate("/map")}
  className="cursor-pointer rounded-3xl 
  bg-gradient-to-r from-green-500 to-green-600 
  p-10 text-white shadow-xl 
  hover:scale-[1.03] transition min-h-[180px]"
>
  <h2 className="text-2xl font-semibold mb-3">
    🗺️ Live Civic Map
  </h2>
  <p className="text-sm opacity-90 leading-relaxed">
    View all reported civic issues on a live interactive map.
    Track problem locations and their status in real-time.
  </p>
</div>

    </div>
    {/* ABOUT CIVICWATCH */}
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold mb-3">
        🚀 About CivicWatch
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        CivicWatch is a smart civic issue reporting platform designed to
        bridge the gap between citizens and local authorities. It allows
        users to easily report public issues, track their resolution status,
        and contribute to building cleaner, safer communities.
      </p>

      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>📸 Upload real-world issues with images</li>
        <li>📍 Location-based complaint tracking</li>
        <li>🗳️ Community-driven upvotes</li>
        <li>⚡ Faster resolution & transparency</li>
        <li>📊 Admin monitoring & progress tracking</li>
      </ul>

      <p className="mt-4 text-sm text-gray-500">
        Together, let’s build smarter and cleaner cities with CivicWatch.
      </p>
    </div>
    <div>
      
    <Speedometer />
    
     </div>
  </div>
);

}
