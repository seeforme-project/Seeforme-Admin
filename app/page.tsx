"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { listVolunteers, listReports, listBlindUsers } from "@/graphql/queries";
import { Volunteer, Report } from "@/graphql/API";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Activity, TrendingUp } from "lucide-react";

const client = generateClient();

export default function Dashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [blindUsersCount, setBlindUsersCount] = useState(0);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // --- 1. Smart Name Logic ---
      const user = await getCurrentUser();
      let displayName = "Admin";

      try {
        const attributes = await fetchUserAttributes();

        if (attributes.name) {
          // 1. Check if 'name' attribute is set in Cognito
          displayName = attributes.name;
        } else if (attributes.email) {
          // 2. If no name, parse the Email
          // Example: ayeshamajeedhtml2@gmail.com -> ayeshamajeedhtml2
          const emailPrefix = attributes.email.split("@")[0];

          // Remove numbers and special chars (ayeshamajeedhtml2 -> ayeshamajeedhtml)
          const nameOnly = emailPrefix.replace(/[0-9._]/g, " ");

          // Capitalize first letter of words
          displayName = nameOnly
            .replace(/\b\w/g, (char) => char.toUpperCase())
            .trim();
        }
      } catch (err) {
        // Fallback to username/ID if attributes fail
        displayName = user.username;
      }
      setAdminName(displayName);

      // --- 2. Fetch Data ---
      const [volData, reportData, blindData] = await Promise.all([
        client.graphql({ query: listVolunteers, authMode: "userPool" }),
        client.graphql({ query: listReports, authMode: "userPool" }),
        client
          .graphql({ query: listBlindUsers, authMode: "userPool" })
          .catch(() => ({ data: { listBlindUsers: { items: [] } } })),
      ]);

      setVolunteers(volData.data.listVolunteers.items as Volunteer[]);
      setReports(reportData.data.listReports.items as Report[]);
      // @ts-ignore
      setBlindUsersCount(blindData.data.listBlindUsers?.items?.length || 0);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Filtering Logic ---
  const filterByMonth = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === new Date().getFullYear()
    );
  };

  const filteredReports = reports.filter(
    (r) => r.createdAt && filterByMonth(r.createdAt)
  );

  // --- Data Processing for Charts ---
  const feedbackData = [
    {
      name: "Positive",
      value: filteredReports.filter((r) => r.category === "GOOD_EXPERIENCE")
        .length,
      color: "#10b981",
    },
    {
      name: "Issues",
      value: filteredReports.filter((r) => r.category !== "GOOD_EXPERIENCE")
        .length,
      color: "#ef4444",
    },
  ];

  const userDistributionData = [
    { name: "Volunteers", value: volunteers.length, color: "#3b82f6" },
    { name: "Blind Users", value: blindUsersCount, color: "#8b5cf6" },
  ];

  const totalVolunteers = volunteers.length;
  const activeVolunteers = volunteers.filter((v) => v.isAvailableNow).length;
  const activePercentage =
    totalVolunteers > 0
      ? ((activeVolunteers / totalVolunteers) * 100).toFixed(0)
      : 0;

  if (loading)
    return (
      <div className="p-8 flex items-center text-gray-500 gap-2">
        <Activity className="animate-spin" /> Loading Overview...
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Displays the parsed name here */}
          <h1 className="text-3xl font-bold text-gray-900">
            Hello, {adminName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here is what's happening with SeeForMe today.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Period:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="text-sm font-bold text-gray-900 bg-transparent outline-none cursor-pointer"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-6 text-white shadow-xl">
          <div className="relative z-10">
            <p className="text-sm font-medium text-gray-400 mb-1">
              Total Volunteers
            </p>
            <h3 className="text-4xl font-bold">{totalVolunteers}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <TrendingUp size={16} />
              <span>Registered on platform</span>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d9f99d] to-[#84cc16] p-6 text-[#1a2e05] shadow-xl">
          <div className="relative z-10">
            <p className="text-sm font-bold opacity-80 mb-1">
              Active Volunteers
            </p>
            <h3 className="text-4xl font-extrabold">{activeVolunteers}</h3>

            <div className="mt-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{activePercentage}%</span>
                <span className="text-sm font-bold mb-1 opacity-70">
                  of Total
                </span>
              </div>
              <div className="h-10 mt-2 w-full opacity-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { v: 10 },
                      { v: 20 },
                      { v: 15 },
                      { v: 30 },
                      { v: 25 },
                      { v: 40 },
                      { v: 35 },
                      { v: 50 },
                    ]}
                  >
                    <Bar dataKey="v" fill="#1a2e05" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users size={20} className="text-blue-500" />
            User Base Distribution
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-emerald-500" />
            Feedback Overview (
            {new Date(0, selectedMonth).toLocaleString("default", {
              month: "short",
            })}
            )
          </h2>
          {filteredReports.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No reports data for this month
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={feedbackData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fill: "#4b5563", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                    {feedbackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
