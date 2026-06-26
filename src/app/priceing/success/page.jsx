"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("confirming");
  const [message, setMessage] = useState("Confirming your subscription...");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!sessionId) {
        setStatus("error");
        setMessage("Missing Stripe session ID.");
        return;
      }

      try {
        const res = await fetch("/api/subscription/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || data.error || "Failed to update subscription.");
          return;
        }

        setStatus("success");
        setPlan(data.plan);
        setMessage(`Payment successful! Your plan is now ${data.plan}.`);
      } catch (error) {
        console.error("Subscription confirm error:", error);
        setStatus("error");
        setMessage("Something went wrong while confirming subscription.");
      }
    };

    confirmSubscription();
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/40 bg-white/70 p-10 shadow-xl backdrop-blur-xl">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : status === "error"
                ? "bg-red-100 text-red-700"
                : "bg-[#DDE5D0] text-[#6B8E23]"
          }`}
        >
          {status === "success" ? "✓" : status === "error" ? "!" : "..."}
        </div>

        <h2 className="mt-6 text-3xl font-bold text-[#2F3A2F]">
          Subscription Status
        </h2>

        <p className="mt-4 text-[#5D6B57]">{message}</p>

        {plan && (
          <p className="mt-3 rounded-full bg-[#DDE5D0] px-5 py-2 text-sm font-bold capitalize text-[#556B2F]">
            Current Plan: {plan}
          </p>
        )}

        <button
          type="button"
          onClick={() => router.push("/dashboard/member")}
          className="mt-8 rounded-full bg-[#6B8E23] px-7 py-3 font-semibold text-white transition hover:bg-[#5A7A1E]"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}