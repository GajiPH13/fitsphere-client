
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MemberBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const userId = user?.id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (isPending) return;

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      if (role !== "member") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (!userId) {
          return;
        }
        const res = await fetch(`${API_URL}/api/bookings/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [API_URL, user, userId, role, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 transition-colors">
        <div className="rounded-2xl border border-white/40 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900 px-8 py-5 shadow-xl backdrop-blur-md">
          <p className="text-sm font-semibold text-[#2F3A2F] dark:text-zinc-300 animate-pulse tracking-wide">
            Loading bookings workspace...
          </p>
        </div>
      </div>
    );
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 px-6 transition-colors">
        <div className="max-w-md w-full rounded-[32px] border border-white/50 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F] dark:text-zinc-50">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-[#5D6B57] dark:text-zinc-400">
            Only members can view booked classes.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 px-6 transition-colors">
        <div className="max-w-md w-full rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 p-6 text-center backdrop-blur-md">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-12 md:px-8 lg:px-16 antialiased relative overflow-hidden transition-colors">
      {/* Eye-catching glassmorphic background ambient glows */}
      <div className="absolute top-[-5%] left-[-5%] h-96 w-96 rounded-full bg-[#6B8E23]/6 dark:bg-zinc-800/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] h-[450px] w-[450px] rounded-full bg-[#2F3A2F]/5 dark:bg-zinc-800/5 blur-[140px] pointer-events-none" />

      <section className="relative mx-auto max-w-6xl z-10 rounded-[32px] border border-white/50 dark:border-zinc-800 bg-white/35 dark:bg-zinc-900/90 p-6 md:p-10 shadow-xl backdrop-blur-xl">
        <div className="mb-8 relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6B8E23]/20 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5A7A1E] dark:text-zinc-300 shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23] dark:bg-zinc-400" />
            Member Portal
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-4xl">
            My Booked Classes
          </h1>
          <p className="mt-2 text-sm font-medium text-[#5D6B57]/90 dark:text-zinc-400">
            Track your schedule, verified receipts, and ongoing active session access.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-white dark:border-zinc-800 bg-white/40 dark:bg-zinc-950 p-12 text-center shadow-sm backdrop-blur-md">
            <h2 className="text-xl font-black tracking-tight text-[#2F3A2F] dark:text-zinc-50">
              No bookings found
            </h2>
            <p className="mt-1.5 text-xs font-medium text-[#5D6B57]/90 dark:text-zinc-400">
              Your scheduled sessions and dashboard updates will live here.
            </p>
          </div>
        ) : (
          /* Custom Table Layout built with clean glassmorphic panels */
          <div className="overflow-hidden rounded-2xl border border-white dark:border-zinc-800 bg-white/30 dark:bg-zinc-950 shadow-md backdrop-blur-md">
            {/* Header */}
            <div className="hidden grid-cols-[1.4fr_1fr_0.7fr_1fr_1fr_1fr] gap-4 border-b border-white/40 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 dark:text-zinc-400 md:grid">
              <span>Class Info</span>
              <span>Instructor</span>
              <span>Price</span>
              <span>Payment State</span>
              <span>Session Status</span>
              <span className="text-right">Action</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/30 dark:divide-zinc-800">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid gap-3 p-4 sm:p-5 md:grid-cols-[1.4fr_1fr_0.7fr_1fr_1fr_1fr] md:gap-4 md:items-center transition-all duration-200 hover:bg-white/30 dark:hover:bg-zinc-900/40"
                >
                  {/* Mobile labels embedded using standard flex arrangements */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[#5D6B57]/60 dark:text-zinc-500 uppercase tracking-wide md:hidden">Class</span>
                    <p className="font-black text-base md:text-sm tracking-tight text-[#2F3A2F] dark:text-zinc-100">
                      {booking.classTitle || "Unknown Class"}
                    </p>
                    <p className="text-xs font-medium text-[#5D6B57]/80 dark:text-zinc-400">
                      Booked:{" "}
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })
                        : "No date"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 dark:text-zinc-500 uppercase tracking-wide md:hidden">Instructor</span>
                    <p className="text-sm font-semibold text-[#4B5A42] dark:text-zinc-300">
                      {booking.trainer || "Unknown"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 dark:text-zinc-500 uppercase tracking-wide md:hidden">Price</span>
                    <p className="text-sm font-black text-[#2F3A2F] dark:text-zinc-100">
                      ${booking.price || 0}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 dark:text-zinc-500 uppercase tracking-wide md:hidden">Payment State</span>
                    <span
                      className={`w-fit inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                        booking.paymentStatus === "approved"
                          ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400 dark:border-green-900/50"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400 dark:border-amber-900/50"
                      }`}
                    >
                      {booking.paymentStatus || "pending"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 dark:text-zinc-500 uppercase tracking-wide md:hidden">Session Status</span>
                    <span className="w-fit inline-flex items-center rounded-full border border-[#6B8E23]/20 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5A7A1E] dark:text-zinc-300 shadow-sm">
                      {booking.bookingStatus || "booked"}
                    </span>
                  </div>

                  <div className="mt-2 flex md:mt-0 md:justify-end">
                    <Link
                      href={`/allclasses/${booking.classId}`}
                      className="w-full text-center md:w-auto inline-flex items-center justify-center rounded-full border border-white dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-xs font-bold text-[#2F3A2F] dark:text-zinc-100 shadow-sm transition-all duration-200 hover:bg-[#6B8E23]/10 dark:hover:bg-zinc-700 hover:text-[#5A7A1E] dark:hover:text-zinc-200 hover:border-[#6B8E23]/20 dark:hover:border-zinc-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}