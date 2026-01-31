import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const issueData = [
  { name: "Garbage", count: 40 },
  { name: "Streetlight", count: 25 },
  { name: "Water", count: 20 },
  { name: "Pothole", count: 10 },
  { name: "Other", count: 5 },
];

export default function IssueBarChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">
        📊 Issue Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={issueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}