import garbageImg from "../../assets/garbage.png";
import waterImg from "../../assets/water leakage.png";
import streetLightImg from "../../assets/street light.png";

const mockIssues = [
  {
    id: 1,
    title: "Garbage overflow near bus stand",
    category: "Garbage",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    title: "Streetlight not working",
    category: "Streetlight",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Water leakage on road",
    category: "Water",
    status: "Resolved",
    priority: "Low",
  },
];

// Image mapping
const categoryImage = {
  Garbage: garbageImg,
  Water: waterImg,
  Streetlight: streetLightImg,
};

export default function IssueFeed() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nearby Issues</h1>

      <div className="grid gap-5">
        {mockIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
          >
            {/* LEFT IMAGE */}
            <img
              src={categoryImage[issue.category]}
              alt={issue.category}
              className="w-44 h-full object-cover"
            />

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-5">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">
                  {issue.title}
                </h2>

                <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                  {issue.priority}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Category: {issue.category}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className="font-semibold">
                  {issue.status}
                </span>
              </p>

              {/* ACTION BUTTON */}
              <div className="mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                  bg-green-100 text-green-700 hover:bg-green-200 
                  transition font-medium"
                >
                  👍 Upvote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
