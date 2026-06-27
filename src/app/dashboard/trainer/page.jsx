// "use client";

// import React from "react";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export default function TrainerDashboardPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;
//   const role = user?.role;

//   if (isPending) {
//     return <p className="p-10 text-center">Loading trainer dashboard...</p>;
//   }

//   if (!user) {
//     router.replace("/auth/signin");
//     return null;
//   }

//   if (role !== "trainer") {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only trainers can access this dashboard.
//         </p>
//       </main>
//     );
//   }

//   const cards = [
//     {
//       title: "My Classes",
//       description: "View your submitted classes and approval status.",
//       href: "/dashboard/trainer/classes",
//     },
//     {
//       title: "Create Class",
//       description: "Submit a new class for admin approval.",
//       href: "/dashboard/trainer/classes/create",
//     },
//     {
//       title: "Attendees",
//       description: "View members who booked your classes.",
//       href: "/dashboard/trainer/attendees",
//     },
//     {
//       title: "Forum Posts",
//       description: "Create and manage your community posts.",
//       href: "/dashboard/trainer/forum",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-7xl">
//         <div className="rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
//           <p className="text-sm font-bold uppercase tracking-widest text-[#6B8E23]">
//             Trainer Workspace
//           </p>

//           <h1 className="mt-4 text-4xl font-black text-[#2F3A2F]">
//             Welcome, {user.name}
//           </h1>

//           <p className="mt-3 max-w-2xl text-[#5D6B57]">
//             Manage your classes, track approvals, review attendees, and share
//             fitness knowledge with the community.
//           </p>
//         </div>

//         <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {cards.map((card) => (
//             <Link
//               key={card.title}
//               href={card.href}
//               className="rounded-[30px] border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-[#DDE5D0]"
//             >
//               <h2 className="text-2xl font-bold text-[#2F3A2F]">
//                 {card.title}
//               </h2>
//               <p className="mt-3 text-sm leading-6 text-[#5D6B57]">
//                 {card.description}
//               </p>
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
    return <p className="p-10 text-center">Loading trainer dashboard...</p>;
  }

  if (!user) {
    return null;
  }

  if (role !== "trainer") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only trainers can access this dashboard.
        </p>
      </main>
    );
  }

  const cards = [
    {
      title: "My Classes",
      description: "View your submitted classes and approval status.",
      href: "/dashboard/trainer/classes",
    },
    {
      title: "Create Class",
      description: "Submit a new class for admin approval.",
      href: "/dashboard/trainer/classes/create",
    },
    {
      title: "Attendees",
      description: "View members who booked your classes.",
      href: "/dashboard/trainer/attendees",
    },
    {
      title: "Forum Posts",
      description: "Create and manage your community posts.",
      href: "/dashboard/trainer/forum",
    },
  ];

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#6B8E23]">
            Trainer Workspace
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#2F3A2F]">
            Welcome, {user.name}
          </h1>

          <p className="mt-3 max-w-2xl text-[#5D6B57]">
            Manage your classes, track approvals, review attendees, and share
            fitness knowledge with the community.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[30px] border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-[#DDE5D0]"
            >
              <h2 className="text-2xl font-bold text-[#2F3A2F]">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5D6B57]">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}