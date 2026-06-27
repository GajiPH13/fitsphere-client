"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function MemberSubscriptionPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role;
  const plan = user?.plan || "free";
  const subscriptionStatus = user?.subscriptionStatus || "inactive";

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/auth/signin");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-xl border border-white/40 bg-white/40 px-6 py-4 shadow-md backdrop-blur-md">
          <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse">Loading subscription...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-4">
        <div className="max-w-sm rounded-2xl border border-white/50 bg-white/60 p-6 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-black tracking-tight text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-1.5 text-xs font-medium text-[#5D6B57]">Only members can view subscription details.</p>
        </div>
      </main>
    );
  }

  const plans = [
    {
      name: "Free",
      key: "free",
      price: "$0",
      description: "Basic access to explore FitSphere.",
      features: ["Browse classes", "Read forum posts", "Save favorites"],
    },
    {
      name: "Starter",
      key: "starter",
      price: "$19.99",
      description: "Best for members starting their fitness journey.",
      features: ["Book fitness classes", "Favorite classes", "Member dashboard"],
    },
    {
      name: "Pro",
      key: "pro",
      price: "$24.99",
      description: "For active members who want full access.",
      features: ["Unlimited class bookings", "Priority access", "Premium support"],
    },
  ];

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-10 md:px-10 lg:px-16 antialiased">
      
      {/* BACKGROUND GLOW SYSTEM */}
      <div className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-[#6B8E23]/15 to-[#A3B18A]/25 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 h-64 w-64 rounded-full bg-[#5A7A1E]/10 blur-[60px] pointer-events-none" />

      <section className="relative mx-auto max-w-5xl z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-6 space-y-1">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#5A7A1E] backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-[#6B8E23]"></span>
            Billing Control
          </span>
          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">My Subscription</h1>
          <p className="text-xs font-medium text-[#5D6B57]/90">View your current tier and manage updates.</p>
        </div>

        {/* OVERVIEW COMPACT GLASS CARD */}
        <div className="group relative overflow-hidden mb-6 rounded-2xl border border-white/60 bg-white/35 p-5 shadow-md backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-0.5 rounded-md inline-block">Current Plan</p>
              <h2 className="mt-1 text-2xl font-black capitalize tracking-tight text-[#2F3A2F]">{plan} Plan</h2>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/40 p-3 backdrop-blur-sm sm:text-right min-w-[160px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#5D6B57]">Subscription Status</p>
              <div className="flex items-center gap-1.5 mt-0.5 sm:justify-end">
                <span className={`h-1.5 w-1.5 rounded-full ${subscriptionStatus === "active" ? "bg-[#6B8E23]" : "bg-amber-500 animate-pulse"}`} />
                <span className="text-sm font-black capitalize text-[#2F3A2F]">{subscriptionStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT PLANS GRID */}
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((item) => {
            const isCurrentPlan = plan === item.key;

            return (
              <article
                key={item.key}
                className={`group relative flex flex-col rounded-2xl border p-5 shadow-md backdrop-blur-xl transition-all duration-200 ${
                  isCurrentPlan
                    ? "border-[#6B8E23] bg-gradient-to-br from-[#DDE5D0]/90 to-[#C9D6B8]/90 shadow-lg shadow-[#6B8E23]/5"
                    : "border-white/60 bg-white/35 hover:bg-white/55"
                }`}
              >
                {isCurrentPlan && (
                  <span className="absolute top-3 right-4 text-xs font-black text-[#6B8E23]/40 tracking-wider uppercase select-none pointer-events-none">Active</span>
                )}

                <h3 className="text-xl font-black tracking-tight text-[#2F3A2F]">{item.name}</h3>
                <p className="mt-1 text-xs font-medium text-[#5D6B57]/90 leading-normal min-h-[32px]">{item.description}</p>

                <div className="mt-3 flex items-baseline gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-[#2F3A2F]">{item.price}</span>
                  {item.key !== "free" && <span className="text-[10px] font-bold text-[#5D6B57] uppercase tracking-wider">/mo</span>}
                </div>

                {/* FEATURE ROWS */}
                <ul className="mt-4 flex-1 space-y-2 text-xs font-medium text-[#4B5A42]">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${isCurrentPlan ? "bg-[#6B8E23] text-white" : "bg-white text-[#6B8E23] shadow-sm"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="h-2.5 w-2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-[#2F3A2F]/90 text-[11px]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* ACTION LAYER BUTTONS */}
                <div className="mt-4 pt-3 border-t border-white/20">
                  {isCurrentPlan ? (
                    <button
                      type="button"
                      disabled
                      className="flex w-full items-center justify-center rounded-xl bg-[#2F3A2F] py-2 text-xs font-bold text-white shadow-sm cursor-not-allowed select-none"
                    >
                      Current Tier
                    </button>
                  ) : (
                    <Link
                      href="/priceing"
                      className="group/btn flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:opacity-95 active:scale-[0.99]"
                    >
                      Upgrade
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}