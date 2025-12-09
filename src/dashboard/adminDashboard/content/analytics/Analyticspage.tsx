import React from "react";
import { useGetOrdersQuery } from "../../../../features/orders/ordersAPI";
import { useGetCakesQuery } from "../../../../features/cakes/cakesAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Color palettes
const STATUS_COLORS = ["#6366F1", "#EC4899", "#FBBF24", "#10B981", "#F87171"];
const PIE_COLORS = ["#3B82F6", "#9333EA", "#F472B6", "#FBBF24", "#34D399"];

const AnalyticsPage: React.FC = () => {
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = useGetOrdersQuery();
  const { data: cakes, isLoading: cakesLoading, isError: cakesError } = useGetCakesQuery();

  if (ordersLoading || cakesLoading) return <p className="text-gray-500">Loading analytics...</p>;
  if (ordersError || cakesError) return <p className="text-red-500">Failed to load analytics.</p>;

  // Orders by status
  const statusCounts = orders?.reduce((acc: any, order) => {
    acc[order.Status] = (acc[order.Status] || 0) + 1;
    return acc;
  }, {}) || {};

  const statusData = Object.keys(statusCounts).map((status, i) => ({
    name: status,
    value: statusCounts[status],
    color: STATUS_COLORS[i % STATUS_COLORS.length],
  }));

  // Orders over time (grouped by date)
  const ordersByDate: { [key: string]: number } = {};
  orders?.forEach((order) => {
    const date = order.DeliveryDate.split("T")[0];
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  });
  const ordersTrendData = Object.keys(ordersByDate)
    .sort()
    .map((date) => ({ date, orders: ordersByDate[date] }));

  const totalCakes = cakes?.length ?? 0;
  const cakeAvailabilityData = [{ name: "Total Cakes", value: totalCakes, color: PIE_COLORS[0] }];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold">{orders?.length}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-5 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Cakes</h3>
          <p className="text-3xl font-bold">{totalCakes}</p>
        </div>
      </div>

      {/* Orders Trend Line Chart */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Orders Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#6366F1" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders by Status Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Cakes Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Cake Inventory</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={cakeAvailabilityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {cakeAvailabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
