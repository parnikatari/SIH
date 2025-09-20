import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Mon", attendance: 85 },
  { name: "Tue", attendance: 90 },
  { name: "Wed", attendance: 75 },
  { name: "Thu", attendance: 95 },
  { name: "Fri", attendance: 80 },
];

export default function AttendanceChart() {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Weekly Attendance</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="attendance" fill="#3b82f6" />
      </BarChart>
    </div>
  );
}
