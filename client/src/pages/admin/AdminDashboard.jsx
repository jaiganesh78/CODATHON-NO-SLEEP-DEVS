import { useState } from "react";
import IssuePieChart from "../../components/IssuePieChart";
import IssueBarChart from "../../components/IssueBarChart";
import MapView from "../../components/MapView";


export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const [issues] = useState([
    {
      id: 1,
      title: "Garbage overflow near bus stand",
      category: "Garbage",
      department: "Sanitation",
      status: "Pending",
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Streetlight",
      department: "Electrical",
      status: "In Progress",
    },
  ]);

  const publicIssues = [
    { id: 1, title: "Road damage near bridge", dept: "PWD" },
    { id: 2, title: "Hospital beds insufficient", dept: "Health Dept" },
  ];

  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 1,
      title: "Water leakage fixed",
      image:
        "https://images.unsplash.com/photo-1581579185169-1cb27c9f8e66",
    },
  ]);

  const totalIssues = issues.length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const inProgress = issues.filter(i => i.status === "In Progress").length;
  const resolved = verificationQueue.length === 0 ? 1 : 0;

  const handleVerify = (id) => {
    setVerificationQueue((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* ================= DASHBOARD ================= */
  if (activePage === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <h1 className="text-4xl font-extrabold mb-6">🛠 Admin Control Panel</h1>

        {/* ===== STATS ===== */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Issues" value={totalIssues} color="from-indigo-500 to-indigo-700" />
          <StatCard title="Pending" value={pending} color="from-yellow-500 to-yellow-700" />
          <StatCard title="In Progress" value={inProgress} color="from-blue-500 to-blue-700" />
          <StatCard title="Resolved" value={resolved} color="from-green-500 to-green-700" />
        </div>

        {/* ===== MAIN CARDS ===== */}
        <div className="grid md:grid-cols-3 gap-8">
          <DashboardCard
            title="Issues Raised"
            icon="📋"
            color="from-blue-500 to-blue-700"
            onClick={() => setActivePage("issues")}
          />

          <DashboardCard
            title="Public Sector Issues"
            icon="🏗️"
            color="from-orange-500 to-orange-700"
            onClick={() => setActivePage("public")}
          />

          <DashboardCard
            title="Verification & Resolution"
            icon="✅"
            color="from-green-500 to-green-700"
            onClick={() => setActivePage("verify")}
          />
           <DashboardCard
  title="Live Issue Map 🗺️"
  subtitle="View all complaints on map"
  color="from-purple-500 to-purple-700"
  onClick={() => setActivePage("map")}

/>

        </div>
        {/* ===== ANALYTICS SECTION ===== */}
<div className="grid md:grid-cols-2 gap-8 mt-10">
  <IssuePieChart />
  <IssueBarChart />
</div>

      </div>
    );
  }

  /* ================= ISSUES ================= */
  if (activePage === "issues") {
    return (
      <PageWrapper title="Issues Raised" goBack={() => setActivePage("dashboard")}>
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Issue</th>
              <th className="p-3">Category</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{i.title}</td>
                <td className="p-3">{i.category}</td>
                <td className="p-3">
                  <select className="border rounded px-3 py-1">
                    <option>{i.department}</option>
                    <option>Sanitation</option>
                    <option>Electrical</option>
                    <option>Water Board</option>
                  </select>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageWrapper>
    );
  }
{/* ================= MAP VIEW ================= */}
{activePage === "map" && (
  <>
    <BackButton onClick={() => setActivePage("dashboard")} />

    <div className="bg-white p-6 rounded-xl shadow">
      <MapView
        issues={[
          {
            title: "Garbage Overflow",
            description: "Not cleaned for 2 days",
            lat: 13.0827,
            lng: 80.2707,
            status: "Pending",
          },
          {
            title: "Streetlight Issue",
            description: "Light not working",
            lat: 13.09,
            lng: 80.275,
            status: "In Progress",
          },
        ]}
      />
    </div>
  </>
)}
  /* ================= PUBLIC ================= */
  if (activePage === "public") {
    return (
      <PageWrapper title="Public Sector Issues" goBack={() => setActivePage("dashboard")}>
        <div className="grid md:grid-cols-2 gap-6">
          {publicIssues.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600 mt-2">
                Department: {p.dept}
              </p>
            </div>
          ))}
        </div>
      </PageWrapper>
    );
  }

  /* ================= VERIFICATION ================= */
  if (activePage === "verify") {
    return (
      <PageWrapper title="Verification & Resolution" goBack={() => setActivePage("dashboard")}>
        {verificationQueue.length === 0 ? (
          <p className="text-gray-500">No pending verifications</p>
        ) : (
          verificationQueue.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-6 bg-white shadow-md rounded-xl p-4 mb-4"
            >
              <img
                src={v.image}
                className="w-28 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{v.title}</h4>
                <p className="text-gray-500">
                  Proof uploaded by department
                </p>
              </div>
              <button
                onClick={() => handleVerify(v.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          ))
        )}
      </PageWrapper>
    );
  }
}

/* ===== UI COMPONENTS ===== */

function DashboardCard({ title, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-white bg-gradient-to-r ${color} p-6 rounded-2xl shadow-lg hover:scale-105 transition`}
    >
      <div className="text-4xl">{icon}</div>
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <p className="text-sm opacity-90 mt-1">Click to manage</p>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`text-white bg-gradient-to-r ${color} p-6 rounded-xl shadow-lg`}
    >
      <h3 className="text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function PageWrapper({ title, children, goBack }) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 font-medium"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="bg-white rounded-xl shadow p-6">
        {children}
      </div>
    </div>
  );
}
