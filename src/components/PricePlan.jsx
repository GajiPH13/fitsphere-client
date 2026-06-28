
"use client";

import React, { useEffect, useState } from "react";

const plans = [
  {
    id: 1,
    planKey: "starter",
    name: "Starter",
    price: 19.99,
    description: "Perfect for beginners starting their fitness journey.",
    cta: "Start Free Trial",
    featured: false,
    features: [
      "Access beginner classes",
      "Book 5 classes/month",
      "Community forum access",
      "Basic progress tracking",
    ],
    priceId: "price_1TlkjJ2LPNK4FLws3FQK8TK9",
    allowedRoles: ["member"],
  },
  {
    id: 2,
    planKey: "pro",
    name: "Pro",
    price: 24.99,
    description: "Best for committed members seeking faster progress.",
    cta: "Upgrade Now",
    featured: true,
    features: [
      "Unlimited class booking",
      "Premium classes access",
      "Direct trainer messaging",
      "Advanced analytics",
      "Personalized recommendations",
    ],
    priceId: "price_1TlkaW2LPNK4FLws2HlZeC2L",
    allowedRoles: ["member"],
  },
  {
    id: 3,
    planKey: "trainer",
    name: "Elite Trainer",
    price: 29.99,
    description: "For professional trainers growing their business.",
    cta: "Become Trainer",
    featured: false,
    features: [
      "Unlimited class creation",
      "Manage attendees",
      "Revenue analytics",
      "Verified trainer badge",
      "Featured profile listing",
    ],
    priceId: "price_1TlksO2LPNK4FLws9GIhkQZv",
    allowedRoles: ["trainer"],
  },
];

export default function PricePlan() {
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন এবং ফ্লিকারিং প্রতিরোধ করার জন্য গার্ড স্টেট
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f4f7f0] dark:bg-zinc-950 px-6 py-28 transition-colors duration-300" />
    );
  }

  return (
    <section className="relative overflow-hidden px-6 md:px-16 lg:px-24 py-28 bg-gradient-to-br from-[#f4f7f0] via-[#edf3e7] to-[#e4edd9] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 antialiased transition-colors duration-300">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/10 -translate-x-1/2 w-[400px] h-[400px] bg-[#6B8E23]/10 dark:bg-[#87A96B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 translate-x-1/2 w-[500px] h-[500px] bg-[#A3B18A]/20 dark:bg-black/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-[#5A7A1E] dark:text-[#A3B18A] bg-[#6B8E23]/10 dark:bg-[#87A96B]/10 border border-[#6B8E23]/20 dark:border-[#87A96B]/20 rounded-full uppercase tracking-widest">
            Pricing Options
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight text-[#2F3A2F] dark:text-zinc-50">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-[#5D6B57] dark:text-zinc-400 font-medium leading-relaxed">
            Flexible plans designed for members and trainers to achieve more.
          </p>
        </div>

        {/* Responsive Pricing Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-[36px] p-8 md:p-10 border transition-all duration-500 backdrop-blur-xl hover:-translate-y-2.5 ${
                plan.featured
                  ? "from-[#f0f6eb]/90 to-[#e4f0dc]/90 dark:from-zinc-900/60 dark:to-zinc-900/90 bg-gradient-to-b border-[#6B8E23]/40 dark:border-[#87A96B]/40 shadow-[0_25px_50px_-12px_rgba(107,142,35,0.15)] dark:shadow-black/30 ring-2 ring-[#6B8E23]/20 dark:ring-[#87A96B]/20"
                  : "bg-white/40 dark:bg-zinc-900/30 border-white/60 dark:border-zinc-800/60 shadow-[0_20px_40px_-15px_rgba(47,58,47,0.06)] dark:shadow-black/10 hover:bg-white/50 dark:hover:bg-zinc-900/40"
              }`}
            >
              {/* Featured Ribbon / Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] text-white dark:text-zinc-950 text-xs font-bold tracking-widest uppercase shadow-md shadow-[#6B8E23]/20 border border-white/20 dark:border-zinc-900/50">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold text-[#2F3A2F] dark:text-zinc-100 tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-[#5D6B57] dark:text-zinc-400 font-medium min-h-[40px]">
                  {plan.description}
                </p>

                {/* Pricing Block */}
                <div className="mt-6 pt-6 border-t border-[#2F3A2F]/5 dark:border-zinc-800 flex items-end gap-1">
                  <span className="text-5xl font-black text-[#2F3A2F] dark:text-zinc-50 tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-[#5D6B57] dark:text-zinc-400 mb-2">
                    /month
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm font-semibold text-[#3b473b] dark:text-zinc-300"
                    >
                      <svg
                        className={`size-5 shrink-0 mt-0.5 ${
                          plan.featured ? "text-[#5A7A1E] dark:text-[#87A96B]" : "text-[#6B8E23] dark:text-[#6B8E23]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="mt-10">
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="planKey" value={plan.planKey} />

                  <button
                    type="submit"
                    role="link"
                    className={`w-full rounded-2xl py-4 font-bold transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer text-sm tracking-wide ${
                      plan.featured
                        ? "bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] text-white dark:text-zinc-950 hover:shadow-lg hover:shadow-[#6B8E23]/20 dark:hover:shadow-black/30 hover:brightness-110"
                        : "bg-[#2F3A2F] dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-[#1f261f] dark:hover:bg-zinc-200 hover:shadow-md"
                    }`}
                  >
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer Badges */}
        <div className="mt-14 flex items-center justify-center gap-2 text-xs font-semibold text-[#5D6B57] dark:text-zinc-400">
          <svg
            className="size-4 text-[#6B8E23] dark:text-[#87A96B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>14-day free trial • Cancel anytime • Secure payments</span>
        </div>
      </div>
    </section>
  );
}