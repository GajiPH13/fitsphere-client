
// "use client";

// import React, { useEffect } from "react";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { SquareListUl, SquarePlus, Persons, Comment } from "@gravity-ui/icons";
// import { Button } from "@heroui/react";

// export default function TrainerDashboardPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;
//   const role = user?.role;

//   useEffect(() => {
//     if (isPending) return;

//     if (!user) {
//       router.replace("/auth/signin");
//     }
//   }, [isPending, user, router]);

//   if (isPending) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
//         <div className="rounded-2xl border border-white/40 bg-white/40 px-8 py-5 shadow-xl backdrop-blur-md">
//           <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse tracking-wide">
//             Loading trainer workspace...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   if (role !== "trainer") {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
//         <div className="max-w-md w-full rounded-[32px] border border-white/50 bg-white/50 p-8 text-center shadow-2xl backdrop-blur-xl">
//           <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
//             Access Denied
//           </h1>
//           <p className="mt-2 text-sm text-[#5D6B57]">
//             Only registered trainers can access this workspace.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   const cards = [
//     {
//       title: "My Classes",
//       description: "View your submitted classes and approval status.",
//       href: "/dashboard/trainer/classes",
//       icon: <SquareListUl className="w-5 h-5" />,
//     },
//     {
//       title: "Create Class",
//       description: "Submit a new class for admin approval.",
//       href: "/dashboard/trainer/classes/create",
//       icon: <SquarePlus className="w-5 h-5" />,
//     },
//     {
//       title: "Attendees",
//       description: "View members who booked your classes.",
//       href: "/dashboard/trainer/attendees",
//       icon: <Persons className="w-5 h-5" />,
//     },
//     {
//       title: "Forum Posts",
//       description: "Create and manage your community posts.",
//       href: "/dashboard/trainer/forum",
//       icon: <Comment className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-10 md:px-12 lg:px-20 antialiased relative overflow-hidden">
//       {/* Decorative background ambient glows */}
//       <div className="absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-[#6B8E23]/8 blur-[100px] pointer-events-none" />
//       <div className="absolute bottom-[10%] right-[-5%] h-80 w-80 rounded-full bg-[#2F3A2F]/5 blur-[120px] pointer-events-none" />

//       <section className="relative mx-auto max-w-7xl z-10">
//         {/* HERO BANNER CARD */}
//         <div className="rounded-[32px] border border-white/50 bg-white/35 p-6 md:p-8 shadow-xl backdrop-blur-xl relative overflow-hidden group">
//           <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6B8E23]/20 bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5A7A1E] shadow-sm backdrop-blur-md">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23]" />
//             FitSphere Workspace
//           </span>

//           <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2F3A2F] md:text-4xl lg:text-5xl">
//             Welcome, {user.name}
//           </h1>

//           <p className="mt-3 max-w-xl text-sm font-medium text-[#5D6B57]/90 leading-relaxed">
//             Manage your classes, track approvals, review attendees, and share
//             fitness knowledge with the community.
//           </p>
//         </div>

//         {/* WORKSPACE NAVIGATION GRID */}
//         <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {cards.map((card) => (
//             <Link
//               key={card.title}
//               href={card.href}
//               className="group rounded-2xl border border-white/50 bg-white/30 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 hover:shadow-xl hover:shadow-[#2F3A2F]/5 flex flex-col justify-between min-h-[150px]"
//             >
//               <div>
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-black tracking-tight text-[#2F3A2F] transition-colors duration-200">
//                     {card.title}
//                   </h2>
//                   <div className="rounded-lg bg-white/80 p-1.5 text-[#6B8E23] shadow-sm transition-all duration-300">
//                     {card.icon}
//                   </div>
//                 </div>
//                 <p className="mt-2 text-xs font-medium text-[#5D6B57]/90 leading-relaxed">
//                   {card.description}
//                 </p>
//               </div>

//               <div className="mt-4 flex items-center w-full">
//                 <button
//                   size="sm"
//                   className="w-full flex items-center justify-center gap-1 text-[#6B8E23] px-3 py-1.5 rounded-full text-[11px] font-bold border border-[#6B8E23]/20 bg-[#6B8E23]/5 hover:bg-[#6B8E23]/10 transition-colors"
//                 >
//                   Enter Zone
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SquareListUl, SquarePlus, Persons, Comment } from "@gravity-ui/icons";

export default function TrainerDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role;

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/auth/signin");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-white/40 bg-white/40 px-8 py-5 shadow-xl backdrop-blur-md">
          <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse tracking-wide">
            Loading trainer workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (role !== "trainer") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="max-w-md w-full rounded-[32px] border border-white/50 bg-white/50 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-[#5D6B57]">
            Only registered trainers can access this workspace.
          </p>
        </div>
      </main>
    );
  }

  const cards = [
    {
      title: "My Classes",
      description: "View your submitted classes and approval status.",
      href: "/dashboard/trainer/classes",
      icon: <SquareListUl className="w-5 h-5" />,
    },
    {
      title: "Create Class",
      description: "Submit a new class for admin approval.",
      href: "/dashboard/trainer/classes/create",
      icon: <SquarePlus className="w-5 h-5" />,
    },
    {
      title: "Attendees",
      description: "View members who booked your classes.",
      href: "/dashboard/trainer/attendees",
      icon: <Persons className="w-5 h-5" />,
    },
    {
      title: "Forum Posts",
      description: "Create and manage your community posts.",
      href: "/dashboard/trainer/forum",
      icon: <Comment className="w-5 h-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-10 md:px-12 lg:px-20 antialiased relative overflow-hidden">
      {/* Decorative background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-[#6B8E23]/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] h-80 w-80 rounded-full bg-[#2F3A2F]/5 blur-[120px] pointer-events-none" />

      <section className="relative mx-auto max-w-7xl z-10">
        {/* HERO BANNER CARD */}
        <div className="rounded-[32px] border border-white/50 bg-white/70 p-6 md:p-8 shadow-xl backdrop-blur-xl relative overflow-hidden group">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6B8E23]/20 bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5A7A1E] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23]" />
            FitSphere Workspace
          </span>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2F3A2F] md:text-4xl lg:text-5xl">
            Welcome, {user.name}
          </h1>

          <p className="mt-3 max-w-xl text-sm font-medium text-[#5D6B57]/90 leading-relaxed">
            Manage your classes, track approvals, review attendees, and share
            fitness knowledge with the community.
          </p>
        </div>

        {/* WORKSPACE NAVIGATION GRID */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-white/50 bg-white/30 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/50 hover:shadow-xl hover:shadow-[#2F3A2F]/5 flex flex-col justify-between min-h-[165px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black tracking-tight text-[#2F3A2F] transition-colors duration-200">
                    {card.title}
                  </h2>
                  <div className="rounded-lg bg-white/80 p-1.5 text-[#6B8E23] shadow-sm transition-all duration-300">
                    {card.icon}
                  </div>
                </div>
                <p className="mt-2 text-xs font-medium text-[#5D6B57]/90 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 flex items-center w-full">
                <button
                  size="sm"
                  className="w-full flex items-center justify-center gap-1 text-[#6B8E23] px-3 py-1.5 rounded-full text-[11px] font-bold border border-white bg-white hover:bg-[#6B8E23]/10 hover:text-[#5A7A1E] hover:border-[#6B8E23]/20 shadow-sm transition-colors"
                >
                  Enter Zone
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}