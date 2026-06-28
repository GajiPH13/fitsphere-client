
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
        <p className="animate-pulse text-sm font-semibold text-[#2F3A2F]">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) return null;

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-5">
        <div className="w-full max-w-md rounded-2xl border border-white/50 bg-white/60 p-6 text-center shadow-xl backdrop-blur-xl">
          <h1 className="text-2xl font-black text-[#2F3A2F]">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-[#5D6B57]">
            Only members can access this dashboard.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-5 py-10 antialiased md:px-12 lg:px-20">
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-[#6B8E23]/10 blur-[60px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#A3B18A]/20 blur-[60px]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 space-y-0.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A7A1E]">
            <span className="h-1 w-1 rounded-full bg-[#6B8E23]" />
            Ecosystem Core
          </span>

          <h1 className="text-3xl font-black tracking-tight text-[#2F3A2F]">
            Member Dashboard
          </h1>

          <p className="text-sm font-medium text-[#5D6B57]/90">
            Welcome back,{" "}
            <span className="font-bold text-[#2F3A2F]">
              {user.name || "Member"}
            </span>
            .
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Name" value={user.name || "Not set"} />
          <InfoCard label="Email" value={user.email || "Not set"} isEmail />
          <InfoCard label="Role" value={role} />
          <InfoCard label="Current Plan" value={plan} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/50 bg-white/40 p-7 shadow-lg backdrop-blur-xl transition-all duration-200 hover:bg-white/45">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="space-y-2.5">
              <span
                className={`inline-flex rounded-md border px-3 py-1 text-xs font-bold capitalize shadow-sm ${
                  subscriptionStatus === "active"
                    ? "border-green-200/50 bg-green-500/10 text-green-700"
                    : "border-amber-200/50 bg-amber-500/10 text-amber-700"
                }`}
              >
                Subscription: {subscriptionStatus}
              </span>

              <h2 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
                {isFreePlan
                  ? "You are currently on the Free plan"
                  : `You are subscribed to the ${plan} plan`}
              </h2>

              <p className="max-w-2xl text-sm font-medium leading-normal text-[#5D6B57]">
                {isFreePlan
                  ? "Upgrade your plan to book classes and unlock premium member features."
                  : "Your subscription is active. You can book classes and save favorites."}
              </p>
            </div>

            <Link
              href="/priceing"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] px-6 text-sm font-bold text-white shadow-md shadow-[#6B8E23]/10 transition-all duration-200 hover:opacity-95 hover:shadow-lg active:scale-[0.98]"
            >
              {isFreePlan ? "Upgrade Plan" : "Manage Plan"}
            </Link>
          </div>
        </div>

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
      <p className="text-xs font-bold uppercase tracking-wider text-[#5D6B57]/80">
        {label}
      </p>

      <p
        className={`mt-1 text-lg font-black capitalize tracking-tight text-[#2F3A2F] ${
          isEmail ? "break-all !lowercase font-medium" : ""
        }`}
      >
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
        <span className="select-none text-xl opacity-90 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>

        <h3 className="text-lg font-black tracking-tight text-[#2F3A2F]">
          {title}
        </h3>
      </div>

      <p className="mt-1 pl-8 text-xs font-medium text-[#5D6B57]">
        {description}
      </p>
    </Link>
  );
}