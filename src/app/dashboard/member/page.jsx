"use client";

import React from "react";
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

  if (isPending) {
    return <p className="p-10 text-center">Loading dashboard...</p>;
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  if (role !== "member") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only members can access this dashboard.
        </p>
      </main>
    );
  }

  const isFreePlan = plan === "free";

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F]">
            Member Dashboard
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            Welcome back, {user.name || "Member"}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Name" value={user.name || "Not set"} />
          <InfoCard label="Email" value={user.email || "Not set"} />
          <InfoCard label="Role" value={role} />
          <InfoCard label="Current Plan" value={plan} />
        </div>

        <div className="mt-8 rounded-[32px] border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-bold capitalize ${
                  subscriptionStatus === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                Subscription: {subscriptionStatus}
              </span>

              <h2 className="mt-5 text-3xl font-bold text-[#2F3A2F]">
                {isFreePlan
                  ? "You are currently on the Free plan"
                  : `You are subscribed to the ${plan} plan`}
              </h2>

              <p className="mt-3 text-[#5D6B57]">
                {isFreePlan
                  ? "Upgrade your plan to book classes and unlock member features."
                  : "Your subscription is active. You can book classes and save favorites."}
              </p>
            </div>

            <Link
              href="/priceing"
               className="inline-flex items-center justify-center
  rounded-full
  bg-[#6B8E23]
  px-7 py-3
  font-bold
  text-[#2F3A2F]
  border-2 border-[#4F6B1B]
  shadow-xl
  hover:bg-[#55741C]
  transition-all"
          >
            
              {isFreePlan ? "Upgrade Plan" : "Manage Plan"}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 ">
          <ActionCard
            title="My Bookings"
            description="View your booked classes."
            href="/dashboard/member/my-bookings"
          />

          <ActionCard
            title="Favorite Classes"
            description="See your saved classes."
            href="/dashboard/member/favorite-classes"
          />

          <ActionCard
            title="Apply as Trainer"
            description="Submit your trainer application."
            href="/dashboard/member/apply-trainer"
          />
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[28px] border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-2xl">
      <p className="text-sm text-[#5D6B57]">{label}</p>
      <p className="mt-2 wrap-break-word text-xl font-bold capitalize text-[#2F3A2F]">
        {value}
      </p>
    </div>
  );
}

function ActionCard({ title, description, href }) {
  return (
    <Link
      href={href}
      className="rounded-[28px] border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-xl"
    >
      <h3 className="text-xl font-bold text-[#2F3A2F]">{title}</h3>
      <p className="mt-2 text-sm text-[#5D6B57]">{description}</p>
    </Link>
  );
}