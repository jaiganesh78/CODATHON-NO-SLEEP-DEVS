import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const issueStats = [
  { name: "Garbage", value: 40 },
  { name: "Streetlight", value: 25 },
  { name: "Water", value: 20 },
  { name: "Pothole", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#a855f7", "#64748b"];

export default function IssuePieChart() {
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius =
      innerRadius + (outerRadius - innerRadius) * 1.35;

    const x =
      cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y =
      cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#111"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">
        📊 Issue Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={issueStats}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={45}
            paddingAngle={3}
            label={renderLabel}
          >
            {issueStats.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={60}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}