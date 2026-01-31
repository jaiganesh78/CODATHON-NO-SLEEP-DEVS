import { useState } from "react";
import MapView from "../../components/MapView";

export default function DepartmentDashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Garbage overflow near bus stand",
      category: "Garbage",
      status: "Pending",
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Electrical",
      status: "Pending",
    },
  ]);

  const [completed, setCompleted] = useState([]);

  const pendingCount = complaints.length;
  const completedCount = completed.length;
  const totalTasks = pendingCount + completedCount;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-6">🏢 Department Panel</h1>

      {/* ===== STATUS CARDS ===== */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Tasks" value={totalTasks} color="from-indigo-500 to-indigo-700" />
        <StatCard title="Pending Tasks" value={pendingCount} color="from-yellow-500 to-yellow-700" />
        <StatCard title="Completed Tasks" value={completedCount} color="from-green-500 to-green-700" />
      </div>

      {/* ================= DASHBOARD ================= */}
      {activeView === "dashboard" && (
        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard
            title="Complaints Issued 📋"
            subtitle="View & update complaints"
            color="from-blue-500 to-blue-700"
            onClick={() => setActiveView("complaints")}
          />

          <DashboardCard
            title="Completion Update ✅"
            subtitle="Upload work proof"
            color="from-green-500 to-green-700"
            onClick={() => setActiveView("completion")}
          />
          <DashboardCard
  title="Live Issue Map 🗺️"
  subtitle="View all complaints on map"
  color="from-purple-500 to-purple-700"
  onClick={() => setActiveView("map")}
/>

        </div>
        
      )}

      {/* ================= COMPLAINTS ================= */}
      {activeView === "complaints" && (
        <>
          <BackButton onClick={() => setActiveView("dashboard")} />

          <div className="grid md:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-gray-500">Category: {c.category}</p>

                <div className="mt-4 flex gap-3">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    In Progress
                  </button>

                  <button
                    onClick={() =>
                      setComplaints(complaints.filter((x) => x.id !== c.id))
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Mark Fake
                  </button>

                  <button
                    onClick={() => {
                      setCompleted([...completed, c]);
                      setComplaints(
                        complaints.filter((x) => x.id !== c.id)
                      );
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* ================= MAP VIEW ================= */}
{activeView === "map" && (
  <>
    <BackButton onClick={() => setActiveView("dashboard")} />

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


      {/* ================= COMPLETION ================= */}
      {activeView === "completion" && (
        <>
          <BackButton onClick={() => setActiveView("dashboard")} />

          {completed.length === 0 ? (
            <p className="text-gray-500">No completed tasks yet</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {completed.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold">{c.title}</h3>

                  <input
                    type="file"
                    className="mt-3 w-full border rounded p-2"
                  />

                  <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
                    Submit Proof
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function DashboardCard({ title, subtitle, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-90 mt-2">{subtitle}</p>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow`}>
      <p className="text-sm uppercase tracking-wide">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-6 text-blue-600 font-medium"
    >
      ← Back
    </button>
  );
}
