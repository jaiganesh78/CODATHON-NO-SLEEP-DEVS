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

export default function IssueFeed() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nearby Issues</h1>

      <div className="grid gap-4">
        {mockIssues.map((issue) => (
          <div
            key={issue.id}
            className="border rounded-xl p-5 bg-white shadow-sm"
          >
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

            <div className="mt-3 flex gap-4">
              <button className="text-green-600 text-sm">⬆ Upvote</button>
              <button className="text-red-600 text-sm">⬇ Downvote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
