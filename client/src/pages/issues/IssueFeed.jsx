import { useState } from "react";
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
    description:
      "Garbage has been overflowing for days causing bad smell and health issues at peravallur.",
  },
  {
    id: 2,
    title: "Streetlight not working",
    category: "Streetlight",
    status: "In Progress",
    priority: "Medium",
    description:
      "Streetlight not working at night, making the area unsafe at ram nagar.",
  },
  {
    id: 3,
    title: "Water leakage on road",
    category: "Water",
    status: "Resolved",
    priority: "Low",
    description:
      "Water leakage from underground pipe causing road damage near periyar nagar gh.",
  },
];

// Image mapping
const categoryImage = {
  Garbage: garbageImg,
  Water: waterImg,
  Streetlight: streetLightImg,
};

export default function IssueFeed() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nearby Issues</h1>

      {/* ISSUE LIST */}
      <div className="grid gap-5">
        {mockIssues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => setSelectedIssue(issue)}
            className="cursor-pointer flex bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
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

      {/* MODAL */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            {/* Close */}
            <button
              onClick={() => setSelectedIssue(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={categoryImage[selectedIssue.category]}
              alt="issue"
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            
            <h2 className="text-xl font-bold mb-2">
              {selectedIssue.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {selectedIssue.description}
            </p>

            <p><b>Category:</b> {selectedIssue.category}</p>
            <p><b>Status:</b> {selectedIssue.status}</p>

            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
              👍 Upvote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
