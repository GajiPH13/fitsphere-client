
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (isPending) return;
      if (!user) return router.push("/auth/signin");
      if (role !== "admin") return setLoading(false);

      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/admin/stats`, {
          headers: { "x-user-id": user.id },
        });
        if (!res.ok) throw new Error("Failed to fetch admin stats");
        const data = await res.json();
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [API_URL, user, role, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-[#101510]">
        <div className="rounded-xl border border-white/40 bg-white/40 px-6 py-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/10">
          <p className="animate-pulse text-sm font-semibold text-[#2F3A2F] dark:text-[#EDF3E7]">
            Loading admin terminal...
          </p>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-4 dark:bg-[#101510]">
        <div className="max-w-sm rounded-2xl border border-white/50 bg-white/50 p-6 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
          <h1 className="text-2xl font-black text-[#2F3A2F] dark:text-[#EDF3E7]">
            Access Denied
          </h1>
          <p className="mt-2 text-xs text-[#5D6B57] dark:text-[#B8C7AE]">
            Only approved administrators can access this node.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-[#101510]">
        <div className="rounded-xl border border-red-200/40 bg-red-50/50 px-6 py-4 text-xs font-bold text-red-600 shadow-xl backdrop-blur-md dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  const totalRevenue = Number(stats?.totalRevenue || 0);
  const chartColors = ["#6B8E23", "#A3B18A", "#2F3A2F"];

  const topCards = [
    { label: "Total Users", value: stats?.totalUsers || 0, helper: `${stats?.totalMembers || 0} members`, icon: "👥" },
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, helper: "Approved bookings", icon: "💰" },
    { label: "Total Classes", value: stats?.totalClasses || 0, helper: `${stats?.pendingClasses || 0} pending`, icon: "🏋️" },
    { label: "Total Bookings", value: stats?.totalBookings || 0, helper: `${stats?.approvedBookings || 0} approved`, icon: "📅" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-8 antialiased dark:from-[#101510] dark:via-[#121A12] dark:to-[#182018] md:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-[#6B8E23]/5 blur-[80px] dark:bg-[#A3B18A]/10" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#2F3A2F]/5 blur-[80px] dark:bg-white/5" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#6B8E23]/20 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A7A1E] dark:border-[#A3B18A]/20 dark:bg-white/10 dark:text-[#A3B18A]">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[#6B8E23]" /> FitSphere Command
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-[#2F3A2F] dark:text-[#EDF3E7]">
              Overview Terminal
            </h1>
          </div>

          <Link
            href="/dashboard/admin/classes"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] px-5 text-xs font-bold text-white shadow-md shadow-[#6B8E23]/10 transition hover:opacity-95 active:scale-[0.98]"
          >
            Review Classes
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topCards.map((c) => (
            <div
              key={c.label}
              className="group rounded-2xl border border-white/50 bg-white/35 p-5 shadow-md backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/45 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <div className="flex items-center justify-between text-[#5D6B57] dark:text-[#B8C7AE]">
                <p className="text-[11px] font-bold uppercase tracking-wider">{c.label}</p>
                <span className="text-base grayscale transition-all group-hover:grayscale-0">{c.icon}</span>
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#2F3A2F] dark:text-[#EDF3E7]">
                {c.value}
              </h2>
              <p className="mt-1 text-[11px] font-medium text-[#6B785F]/80 dark:text-[#B8C7AE]/80">
                {c.helper}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ChartCard title="User Roles">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={[{ name: "Members", value: stats?.totalMembers || 0 }, { name: "Trainers", value: stats?.totalTrainers || 0 }, { name: "Admins", value: stats?.totalAdmins || 0 }]} dataKey="value" nameKey="name" innerRadius={45} outerRadius={65} paddingAngle={5}>
                  {chartColors.map((color, i) => <Cell key={i} fill={color} className="outline-none" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <LegendList data={[{ name: "Members", value: stats?.totalMembers || 0 }, { name: "Trainers", value: stats?.totalTrainers || 0 }, { name: "Admins", value: stats?.totalAdmins || 0 }]} colors={chartColors} />
          </ChartCard>

          <ChartCard title="Class Status">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={[{ name: "Approved", value: stats?.approvedClasses || 0 }, { name: "Pending", value: stats?.pendingClasses || 0 }, { name: "Rejected", value: stats?.rejectedClasses || 0 }]} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10 }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.15)" }} content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={30}>
                  {chartColors.map((color, i) => <Cell key={i} fill={color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Booking Status">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={[{ name: "Approved", bookings: stats?.approvedBookings || 0 }, { name: "Pending", bookings: stats?.pendingBookings || 0 }]} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="bFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B8E23" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6B8E23" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="bookings" stroke="#6B8E23" fill="url(#bFill)" strokeWidth={2} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <ChartCard title="Platform Snapshot">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={[{ name: "Revenue", value: totalRevenue }, { name: "Bookings", value: stats?.approvedBookings || 0 }, { name: "Classes", value: stats?.approvedClasses || 0 }]} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#5D6B57", fontSize: 10 }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.15)" }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#2F3A2F" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/50 bg-white/35 p-5 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/10">
            <div>
              <h2 className="text-lg font-black text-[#2F3A2F] dark:text-[#EDF3E7]">Quick Controls</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <QuickLink title="Users" href="/dashboard/admin/users" />
                <QuickLink title="Classes" href="/dashboard/admin/classes" />
                <QuickLink title="Trainers" href="/dashboard/admin/trainer-applications" />
                <QuickLink title="Forums" href="/dashboard/admin/forum" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/40 bg-gradient-to-br from-[#DDE5D0]/60 to-[#C9D6B8]/60 p-4 shadow-inner dark:border-white/10 dark:from-white/10 dark:to-white/5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5D6B57] dark:text-[#B8C7AE]">
                  Pending Applications
                </p>
                <h3 className="mt-0.5 text-2xl font-black text-[#2F3A2F] dark:text-[#EDF3E7]">
                  {stats?.pendingTrainerApplications || 0}
                </h3>
              </div>
              <span className="rounded-md bg-white/60 px-2 py-1 text-[10px] font-bold text-[#6B8E23] shadow-sm dark:bg-white/10 dark:text-[#A3B18A]">
                Action Needed
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/50 bg-white/35 p-5 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/10">
      <h2 className="mb-3 text-sm font-black tracking-tight text-[#2F3A2F] dark:text-[#EDF3E7]">{title}</h2>
      <div className="flex w-full flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

function LegendList({ data, colors }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {data.map((item, i) => (
        <div key={item.name} className="flex flex-col items-center justify-center rounded-xl border-2 border-white/40 bg-white/20 py-1.5 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#5D6B57] dark:text-[#B8C7AE]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            {item.name}
          </span>
          <span className="mt-0.5 text-sm font-black text-[#2F3A2F] dark:text-[#EDF3E7]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function QuickLink({ title, href }) {
  return (
    <Link href={href} className="flex h-10 items-center justify-center rounded-xl border border-white/30 bg-white/40 text-center text-xs font-bold text-[#2F3A2F] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/60 active:translate-y-0 dark:border-white/10 dark:bg-white/10 dark:text-[#EDF3E7] dark:hover:bg-white/15">
      {title}
    </Link>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/60 bg-white/75 p-2.5 text-xs font-bold text-[#2F3A2F] shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#151b14]/90 dark:text-[#EDF3E7]">
        <p className="opacity-80">{payload[0].name}</p>
        <p className="mt-0.5 text-sm text-[#6B8E23] dark:text-[#A3B18A]">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}