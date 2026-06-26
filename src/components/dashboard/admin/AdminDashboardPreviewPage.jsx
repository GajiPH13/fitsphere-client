
// "use client";

// import React, { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function AdminDashboardPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   const user = session?.user;
//   const role = user?.role;

//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStats = async () => {
//       if (isPending) return;

//       if (!user) {
//         router.push("/auth/signin");
//         return;
//       }

//       if (role !== "admin") {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);

//         const res = await fetch(`${API_URL}/api/admin/stats`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch admin stats");
//         }

//         const data = await res.json();
//         setStats(data.stats);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [API_URL, user, role, isPending, router]);

//   if (isPending || loading) {
//     return <p className="p-10 text-center">Loading admin dashboard...</p>;
//   }

//   if (role !== "admin") {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only admins can access this dashboard.
//         </p>
//       </main>
//     );
//   }

//   if (error) {
//     return <p className="p-10 text-center text-red-500">{error}</p>;
//   }

//   const totalRevenue = Number(stats?.totalRevenue || 0);

//   const topCards = [
//     {
//       label: "Total Users",
//       value: stats?.totalUsers || 0,
//       helper: `${stats?.totalMembers || 0} members`,
//     },
//     {
//       label: "Total Revenue",
//       value: `$${totalRevenue.toFixed(2)}`,
//       helper: "Approved bookings only",
//     },
//     {
//       label: "Total Classes",
//       value: stats?.totalClasses || 0,
//       helper: `${stats?.pendingClasses || 0} pending`,
//     },
//     {
//       label: "Total Bookings",
//       value: stats?.totalBookings || 0,
//       helper: `${stats?.approvedBookings || 0} approved`,
//     },
//   ];

//   const userRoleData = [
//     { name: "Members", value: stats?.totalMembers || 0 },
//     { name: "Trainers", value: stats?.totalTrainers || 0 },
//     { name: "Admins", value: stats?.totalAdmins || 0 },
//   ];

//   const classStatusData = [
//     { name: "Approved", value: stats?.approvedClasses || 0 },
//     { name: "Pending", value: stats?.pendingClasses || 0 },
//     { name: "Rejected", value: stats?.rejectedClasses || 0 },
//   ];

//   const bookingData = [
//     { name: "Approved", bookings: stats?.approvedBookings || 0 },
//     { name: "Pending", bookings: stats?.pendingBookings || 0 },
//   ];

//   const revenueData = [
//     { name: "Revenue", value: totalRevenue },
//     { name: "Bookings", value: stats?.approvedBookings || 0 },
//     { name: "Classes", value: stats?.approvedClasses || 0 },
//   ];

//   const chartColors = ["#6B8E23", "#A3B18A", "#2F3A2F"];

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-7xl">
//         <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div>
//             <p className="mb-3 inline-flex rounded-full bg-[#6B8E23]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5A7A1E]">
//               FitSphere Admin
//             </p>

//             <h1 className="text-4xl font-black text-[#2F3A2F] md:text-5xl">
//               Dashboard Overview
//             </h1>

//             <p className="mt-3 text-[#5D6B57]">
//               Track users, classes, bookings, revenue, and trainer applications.
//             </p>
//           </div>

//           <Link
//             href="/dashboard/admin/classes"
//             className="rounded-full bg-[#6B8E23] px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-[#5A7A1E]"
//           >
//             Review Classes
//           </Link>
//         </div>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {topCards.map((card) => (
//             <div
//               key={card.label}
//               className="rounded-[30px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-2xl"
//             >
//               <p className="text-sm font-semibold text-[#5D6B57]">
//                 {card.label}
//               </p>

//               <h2 className="mt-4 text-4xl font-black text-[#2F3A2F]">
//                 {card.value}
//               </h2>

//               <p className="mt-2 text-sm text-[#6B785F]">{card.helper}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 grid gap-6 lg:grid-cols-3">
//           <ChartCard title="User Roles">
//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart>
//                 <Pie
//                   data={userRoleData}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={4}
//                 >
//                   {userRoleData.map((entry, index) => (
//                     <Cell
//                       key={entry.name}
//                       fill={chartColors[index % chartColors.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>

//             <LegendList data={userRoleData} colors={chartColors} />
//           </ChartCard>

//           <ChartCard title="Class Status">
//             <ResponsiveContainer width="100%" height={260}>
//               <BarChart data={classStatusData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="value" radius={[12, 12, 0, 0]}>
//                   {classStatusData.map((entry, index) => (
//                     <Cell
//                       key={entry.name}
//                       fill={chartColors[index % chartColors.length]}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           <ChartCard title="Booking Status">
//             <ResponsiveContainer width="100%" height={260}>
//               <AreaChart data={bookingData}>
//                 <defs>
//                   <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6B8E23" stopOpacity={0.7} />
//                     <stop offset="95%" stopColor="#6B8E23" stopOpacity={0.05} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="bookings"
//                   stroke="#6B8E23"
//                   fill="url(#bookingFill)"
//                   strokeWidth={3}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>

//         <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_.9fr]">
//           <ChartCard title="Platform Snapshot">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#2F3A2F" radius={[12, 12, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           <div className="rounded-[30px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-2xl">
//             <h2 className="text-2xl font-black text-[#2F3A2F]">
//               Quick Actions
//             </h2>

//             <p className="mt-2 text-sm text-[#5D6B57]">
//               Jump directly into key admin workflows.
//             </p>

//             <div className="mt-6 grid gap-4">
//               <QuickLink title="Manage Users" href="/dashboard/admin/users" />
//               <QuickLink
//                 title="Manage Classes"
//                 href="/dashboard/admin/classes"
//               />
//               <QuickLink
//                 title="Trainer Applications"
//                 href="/dashboard/admin/trainer-applications"
//               />
//               <QuickLink title="Forum Posts" href="/dashboard/admin/forum" />
//             </div>

//             <div className="mt-6 rounded-3xl bg-[#DDE5D0]/70 p-5">
//               <p className="text-sm font-semibold text-[#5D6B57]">
//                 Pending Trainer Applications
//               </p>
//               <h3 className="mt-2 text-4xl font-black text-[#2F3A2F]">
//                 {stats?.pendingTrainerApplications || 0}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="rounded-[30px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur-2xl">
//       <h2 className="mb-5 text-2xl font-black text-[#2F3A2F]">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function LegendList({ data, colors }) {
//   return (
//     <div className="mt-4 grid gap-2">
//       {data.map((item, index) => (
//         <div
//           key={item.name}
//           className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3"
//         >
//           <span className="flex items-center gap-2 text-sm font-semibold text-[#2F3A2F]">
//             <span
//               className="h-3 w-3 rounded-full"
//               style={{ backgroundColor: colors[index % colors.length] }}
//             />
//             {item.name}
//           </span>
//           <span className="font-bold text-[#2F3A2F]">{item.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// function QuickLink({ title, href }) {
//   return (
//     <Link
//       href={href}
//       className="rounded-2xl border border-[#A3B18A]/40 bg-white/70 px-5 py-4 font-bold text-[#2F3A2F] transition hover:-translate-y-1 hover:bg-[#DDE5D0]"
//     >
//       {title}
//     </Link>
//   );
// }
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

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      if (role !== "admin") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/admin/stats`);

        if (!res.ok) {
          throw new Error("Failed to fetch admin stats");
        }

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
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-white/40 bg-white/40 px-8 py-6 shadow-xl backdrop-blur-md">
          <p className="text-lg font-semibold text-[#2F3A2F] animate-pulse">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="max-w-md rounded-[32px] border border-white/50 bg-white/60 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-3 text-[#5D6B57]">
            Only approved system administrators can access this secure area.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-red-200/40 bg-red-50/60 px-8 py-6 shadow-xl backdrop-blur-md text-center text-red-600 font-medium">
          {error}
        </div>
      </div>
    );
  }

  const totalRevenue = Number(stats?.totalRevenue || 0);

  const topCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      helper: `${stats?.totalMembers || 0} members`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      helper: "Approved bookings only",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.214.116M12 6.5l.214-.116M6 12h12m-9.43 5.93A3.75 3.75 0 016 14.25M17.13 6.09A3.75 3.75 0 0118 9.75" />
        </svg>
      )
    },
    {
      label: "Total Classes",
      value: stats?.totalClasses || 0,
      helper: `${stats?.pendingClasses || 0} pending`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3m0 0c-2.117 0-4.16.202-6.142.593m12.284 0A48.581 48.581 0 0012 3m0 0H6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21h6" />
        </svg>
      )
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      helper: `${stats?.approvedBookings || 0} approved`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      )
    },
  ];

  const userRoleData = [
    { name: "Members", value: stats?.totalMembers || 0 },
    { name: "Trainers", value: stats?.totalTrainers || 0 },
    { name: "Admins", value: stats?.totalAdmins || 0 },
  ];

  const classStatusData = [
    { name: "Approved", value: stats?.approvedClasses || 0 },
    { name: "Pending", value: stats?.pendingClasses || 0 },
    { name: "Rejected", value: stats?.rejectedClasses || 0 },
  ];

  const bookingData = [
    { name: "Approved", bookings: stats?.approvedBookings || 0 },
    { name: "Pending", bookings: stats?.pendingBookings || 0 },
  ];

  const revenueData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Bookings", value: stats?.approvedBookings || 0 },
    { name: "Classes", value: stats?.approvedClasses || 0 },
  ];

  const chartColors = ["#6B8E23", "#A3B18A", "#2F3A2F"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-6 py-12 md:px-16 lg:px-24 antialiased">
      <section className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#6B8E23]/20 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#6B8E23] animate-pulse"></span>
              FitSphere Admin Terminal
            </span>

            <h1 className="text-4xl font-black tracking-tight text-[#2F3A2F] md:text-5xl lg:text-6xl">
              Dashboard Overview
            </h1>

            <p className="mt-3 text-base font-medium text-[#5D6B57]/90 max-w-xl">
              Track metrics, review classes, evaluate financials, and approve pending trainer verification flows.
            </p>
          </div>

          <Link
            href="/dashboard/admin/classes"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] px-6 py-4 font-bold text-white shadow-xl shadow-[#6B8E23]/20 transition-all duration-300 hover:opacity-95 hover:shadow-[#6B8E23]/30 active:scale-[0.98]"
          >
            Review Classes
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* METRICS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topCards.map((card) => (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/40 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/60 hover:shadow-2xl hover:shadow-[#2F3A2F]/5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wider text-[#5D6B57]">
                  {card.label}
                </p>
                <div className="rounded-xl bg-white/80 p-2.5 text-[#6B8E23] shadow-sm group-hover:bg-[#6B8E23] group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#2F3A2F]">
                {card.value}
              </h2>

              <p className="mt-2 text-xs font-semibold text-[#6B785F]/80 flex items-center gap-1">
                {card.helper}
              </p>
            </div>
          ))}
        </div>

        {/* TOP CHARTS GRID */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          
          {/* USER ROLES PIE CHART */}
          <ChartCard title="User Roles">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={6}
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={chartColors[index % chartColors.length]}
                        className="transition-all duration-300 outline-none"
                      />
                    ))}
                  </Pie>
                  <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <LegendList data={userRoleData} colors={chartColors} />
          </ChartCard>

          {/* CLASS STATUS BAR CHART */}
          <ChartCard title="Class Status">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={classStatusData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.2)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={45}>
                  {classStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* BOOKING STATUS AREA CHART */}
          <ChartCard title="Booking Status">
            <ResponsiveContainer width="100%" height={290}>
              <AreaChart data={bookingData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B8E23" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6B8E23" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#6B8E23"
                  fill="url(#bookingFill)"
                  strokeWidth={3}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* LOWER SNAPSHOT & QUICK ACTIONS BLOCK */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_.9fr]">
          
          {/* PLATFORM SNAPSHOT CHART */}
          <ChartCard title="Platform Snapshot">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#ffffff" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#5D6B57', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.2)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#2F3A2F" radius={[12, 12, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* QUICK ACTIONS SIDEBAR CARD */}
          <div className="rounded-[32px] border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#2F3A2F]">
                Quick Actions
              </h2>

              <p className="mt-2 text-sm font-medium text-[#5D6B57]">
                Jump directly into key administrative verification queues.
              </p>

              <div className="mt-6 grid gap-3">
                <QuickLink title="Manage Users" href="/dashboard/admin/users" />
                <QuickLink title="Manage Classes" href="/dashboard/admin/classes" />
                <QuickLink title="Trainer Applications" href="/dashboard/admin/trainer-applications" />
                <QuickLink title="Forum Posts" href="/dashboard/admin/forum" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/40 bg-gradient-to-br from-[#DDE5D0]/80 to-[#C9D6B8]/80 p-5 shadow-inner">
              <p className="text-xs font-bold uppercase tracking-wider text-[#5D6B57]">
                Pending Trainer Applications
              </p>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="text-4xl font-black text-[#2F3A2F]">
                  {stats?.pendingTrainerApplications || 0}
                </h3>
                <span className="text-xs font-bold text-[#6B8E23] bg-white/60 px-2 py-1 rounded-md">Action Required</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

/* SUB-COMPONENTS */

function ChartCard({ title, children }) {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
      <h2 className="mb-5 text-xl font-black tracking-tight text-[#2F3A2F]">{title}</h2>
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  );
}

function LegendList({ data, colors }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {data.map((item, index) => (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/30 p-2 text-center backdrop-blur-sm"
        >
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#5D6B57]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            {item.name}
          </span>
          <span className="mt-0.5 text-base font-black text-[#2F3A2F]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function QuickLink({ title, href }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-white/30 bg-white/40 px-5 py-3.5 text-sm font-bold text-[#2F3A2F] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#DDE5D0]/80 hover:shadow-md active:translate-y-0"
    >
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 text-[#5D6B57]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>
    </Link>
  );
}

// Glassmorphic Custom Tooltip Component for Recharts
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-bold text-[#5D6B57] uppercase tracking-wider">{payload[0].name}</p>
        <p className="text-lg font-black text-[#2F3A2F] mt-0.5">
          {typeof payload[0].value === 'number' && payload[0].value > 1000 && payload[0].name === "Revenue"
            ? `$${payload[0].value.toLocaleString()}`
            : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}