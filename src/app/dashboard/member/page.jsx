
// "use client";

// import React, { useEffect } from "react";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function MemberDashboardPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;
//   const role = user?.role || "member";
//   const plan = user?.plan || "free";
//   const subscriptionStatus = user?.subscriptionStatus || "inactive";
//   const isFreePlan = plan === "free";

//   useEffect(() => {
//     if (isPending) return;

//     if (!user) {
//       router.replace("/auth/signin");
//     }
//   }, [isPending, user, router]);

//   if (isPending) {
//     return <p className="p-10 text-center">Loading dashboard...</p>;
//   }

//   if (!user) {
//     return null;
//   }

//   if (role !== "member") {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only members can access this dashboard.
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-6xl">
//         <div className="mb-10">
//           <h1 className="text-4xl font-black text-[#2F3A2F]">
//             Member Dashboard
//           </h1>
//           <p className="mt-2 text-[#5D6B57]">
//             Welcome back, {user.name || "Member"}.
//           </p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <InfoCard label="Name" value={user.name || "Not set"} />
//           <InfoCard label="Email" value={user.email || "Not set"} />
//           <InfoCard label="Role" value={role} />
//           <InfoCard label="Current Plan" value={plan} />
//         </div>

//         <div className="mt-8 rounded-[32px] border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-2xl">
//           <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
//             <div>
//               <span
//                 className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${
//                   subscriptionStatus === "active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 Subscription: {subscriptionStatus}
//               </span>

//               <h2 className="mt-5 text-3xl font-bold text-[#2F3A2F]">
//                 {isFreePlan
//                   ? "You are currently on the Free plan"
//                   : `You are subscribed to the ${plan} plan`}
//               </h2>

//               <p className="mt-3 text-[#5D6B57]">
//                 {isFreePlan
//                   ? "Upgrade your plan to book classes and unlock member features."
//                   : "Your subscription is active. You can book classes and save favorites."}
//               </p>
//             </div>

//             <Link
//             type="button"
//               href="/priceing"
//               className="inline-flex  items-center justify-center 
//               rounded-full !bg-[#6B8E23] 
//               px-7 py-3 font-bold !text-white shadow-xl transition-all 
//               hover:bg-[#55741C]"
//             >
//               {isFreePlan ? "Upgrade Plan" : "Manage Plan"}
//             </Link>
//           </div>
//         </div>

//         <div className="mt-8 grid gap-6 md:grid-cols-3">
//           <ActionCard
//             title="My Bookings"
//             description="View your booked classes."
//             href="/dashboard/member/bookings"
//           />

//           <ActionCard
//             title="Favorite Classes"
//             description="See your saved classes."
//             href="/dashboard/member/favorites"
//           />

//           <ActionCard
//             title="Apply as Trainer"
//             description="Submit your trainer application."
//             href="/dashboard/member/apply-trainer"
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

// function InfoCard({ label, value }) {
//   return (
//     <div className="rounded-[28px] border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-2xl">
//       <p className="text-sm text-[#5D6B57]">{label}</p>
//       <p className="mt-2 wrap-break-word text-xl font-bold capitalize text-[#2F3A2F]">
//         {value}
//       </p>
//     </div>
//   );
// }

// function ActionCard({ title, description, href }) {
//   return (
//     <Link
//       href={href}
//       className="rounded-[28px] border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl"
//     >
//       <h3 className="text-xl font-bold text-[#2F3A2F]">{title}</h3>
//       <p className="mt-2 text-sm text-[#5D6B57]">{description}</p>
//     </Link>
//   );
// }
"use client";

import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MemberDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "member";
  const plan = user?.plan || "free";
  const subscriptionStatus = user?.subscriptionStatus || "inactive";
  const isFreePlan = plan === "free";

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/auth/signin");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-5">
        <div className="max-w-md w-full rounded-2xl border border-white/50 bg-white/60 p-6 text-center shadow-xl backdrop-blur-xl">
          <h1 className="text-2xl font-black text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-2 text-sm text-[#5D6B57]">
            Only members can access this dashboard.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-5 py-10 md:px-12 lg:px-20 antialiased">
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-[#6B8E23]/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#A3B18A]/20 blur-[60px] pointer-events-none" />

      <section className="relative mx-auto max-w-6xl z-10">
        
        {/* COMPACT DASHBOARD HEADER */}
        <div className="mb-8 space-y-0.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A7A1E]">
            <span className="h-1 w-1 rounded-full bg-[#6B8E23]"></span>
            Ecosystem Core
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[#2F3A2F]">
            Member Dashboard
          </h1>
          <p className="text-sm font-medium text-[#5D6B57]/90">
            Welcome back, <span className="font-bold text-[#2F3A2F]">{user.name || "Member"}</span>.
          </p>
        </div>

        {/* METRICS INFO GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Name" value={user.name || "Not set"} />
          <InfoCard label="Email" value={user.email || "Not set"} isEmail />
          <InfoCard label="Role" value={role} />
          <InfoCard label="Current Plan" value={plan} />
        </div>

        {/* SUBSCRIPTION SUMMARY GLASS PLATFORM */}
        <div className="mt-6 rounded-2xl border border-white/50 bg-white/40 p-7 shadow-lg backdrop-blur-xl transition-all duration-200 hover:bg-white/45">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="space-y-2.5">
              <span
                className={`inline-flex rounded-md px-3 py-1 text-xs font-bold capitalize shadow-sm border ${
                  subscriptionStatus === "active"
                    ? "bg-green-500/10 border-green-200/50 text-green-700"
                    : "bg-amber-500/10 border-amber-200/50 text-amber-700"
                }`}
              >
                Subscription: {subscriptionStatus}
              </span>

              <h2 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
                {isFreePlan
                  ? "You are currently on the Free plan"
                  : `You are subscribed to the ${plan} plan`}
              </h2>

              <p className="text-sm font-medium leading-normal text-[#5D6B57] max-w-2xl">
                {isFreePlan
                  ? "Upgrade your plan to book classes and unlock premium member features."
                  : "Your subscription is active. You can book classes and save favorites."}
              </p>
            </div>

            <Link
              type="button"
              href="/priceing"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] px-6 text-sm font-bold text-white shadow-md shadow-[#6B8E23]/10 transition-all duration-200 hover:opacity-95 hover:shadow-lg active:scale-[0.98] shrink-0"
            >
              {isFreePlan ? "Upgrade Plan" : "Manage Plan"}
            </Link>
          </div>
        </div>

        {/* INTERACTIVE NAVIGATION CARDS */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <ActionCard
            title="My Bookings"
            description="View your booked classes."
            href="/dashboard/member/bookings"
            icon="📅"
          />

          <ActionCard
            title="Favorite Classes"
            description="See your saved classes."
            href="/dashboard/member/favorites"
            icon="⭐"
          />

          <ActionCard
            title="Apply as Trainer"
            description="Submit your trainer application."
            href="/dashboard/member/apply-trainer"
            icon="💪"
          />
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value, isEmail = false }) {
  return (
    <div className="rounded-xl border border-white/50 bg-white/40 p-5 shadow-md backdrop-blur-md">
      <p className="text-xs font-bold uppercase tracking-wider text-[#5D6B57]/80">{label}</p>
      <p className={`mt-1 text-lg font-black text-[#2F3A2F] capitalize tracking-tight ${isEmail ? "break-all !lowercase font-medium" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function ActionCard({ title, description, href, icon }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/40 p-5 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl opacity-90 select-none group-hover:scale-110 transition-transform duration-200">{icon}</span>
        <h3 className="text-lg font-black tracking-tight text-[#2F3A2F]">{title}</h3>
      </div>
      <p className="mt-1 text-xs font-medium text-[#5D6B57] pl-8">{description}</p>
    </Link>
  );
}