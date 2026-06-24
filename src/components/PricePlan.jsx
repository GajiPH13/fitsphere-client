"use client";

import { getPrimaryClientId } from "better-auth";
import React from "react";

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
  return (
    <section className="relative overflow-hidden px-6 md:px-16 lg:px-24 py-28 bg-gradient-to-br from-[#f4f7f0] via-[#edf3e7] to-[#e4edd9]">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/10 -translate-x-1/2 w-[400px] h-[400px] bg-[#6B8E23]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 translate-x-1/2 w-[500px] h-[500px] bg-[#A3B18A]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 text-xs font-bold text-[#5A7A1E] bg-[#6B8E23]/10 border border-[#6B8E23]/20 rounded-full uppercase tracking-widest">
            Pricing Options
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#2F3A2F]">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-[#5D6B57] font-medium leading-relaxed">
            Flexible plans designed for members and trainers to achieve more.
          </p>
        </div>

        {/* Responsive Pricing Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-[36px] p-8 md:p-10 border transition-all duration-500 hover:-translate-y-2.5 ${
                plan.featured
                  ? "bg-gradient-to-b from-[#f0f6eb]/90 to-[#e4f0dc]/90 border-[#6B8E23]/40 shadow-[0_25px_50px_-12px_rgba(107,142,35,0.15)] ring-2 ring-[#6B8E23]/20"
                  : "bg-white/40 border-white/60 shadow-[0_20px_40px_-15px_rgba(47,58,47,0.06)] hover:bg-white/50"
              }`}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Featured Ribbon / Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] text-white text-xs font-bold tracking-widest uppercase shadow-md shadow-[#6B8E23]/20 border border-white/20">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold text-[#2F3A2F] tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-[#5D6B57] font-medium min-h-[40px]">
                  {plan.description}
                </p>

                {/* Pricing Block */}
                <div className="mt-6 pt-6 border-t border-[#2F3A2F]/5 flex items-end gap-1">
                  <span className="text-5xl font-black text-[#2F3A2F] tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-[#5D6B57] mb-2">
                    /month
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm font-medium text-[#3b473b]"
                    >
                      {/* Modern check indicator replacing simple bullet circles */}
                      <svg
                        className={`size-5 shrink-0 mt-0.5 ${
                          plan.featured ? "text-[#5A7A1E]" : "text-[#6B8E23]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                {/* <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <button type="submit" role="link"
                    className={`w-full rounded-2xl py-4 font-bold transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer text-sm tracking-wide ${
                    plan.featured
                      ? "bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] text-white hover:shadow-lg hover:shadow-[#6B8E23]/20 hover:brightness-110"
                      : "bg-[#2F3A2F] text-white hover:bg-[#1f261f] hover:shadow-md hover:shadow-black/10"
                  }`}
                    >
                      Checkout
                    </button>
                  </section>
                </form> */}
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="planKey" value={plan.planKey} />

                  <button type="submit" role="link" className={`w-full rounded-2xl py-4 font-bold transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer text-sm tracking-wide ${
                    plan.featured
                      ? "bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] text-white hover:shadow-lg hover:shadow-[#6B8E23]/20 hover:brightness-110"
                      : "bg-[#2F3A2F] text-white hover:bg-[#1f261f] hover:shadow-md hover:shadow-black/10"
                  }`}>
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer Badges */}
        <div className="mt-14 flex items-center justify-center gap-2 text-xs font-semibold text-[#5D6B57]">
          <svg
            className="size-4 text-[#6B8E23]"
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
