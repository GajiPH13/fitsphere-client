
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TrainerAttendeesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const trainerId = user?.id;

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

      if (role !== "trainer") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (!trainerId) return;

        const res = await fetch(`${API_URL}/api/bookings/trainer/${trainerId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch attendees");
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
  }, [API_URL, user, role, trainerId, isPending, router]);

  const groupedBookings = bookings.reduce((groups, booking) => {
    const classTitle = booking.classTitle || "Unknown Class";

    if (!groups[classTitle]) {
      groups[classTitle] = [];
    }

    groups[classTitle].push(booking);
    return groups;
  }, {});

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 transition-colors">
        <p className="animate-pulse text-lg font-medium text-[#2F3A2F] dark:text-zinc-300">
          Loading attendees...
        </p>
      </div>
    );
  }

  if (role !== "trainer") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 px-6 transition-colors">
        <div className="w-full max-w-md rounded-3xl border border-white/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-8 text-center shadow-xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-100">Access Denied</h1>
          <p className="mt-3 text-[#5D6B57] dark:text-zinc-400">
            Only trainers can manage attendees.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 transition-colors">
        <p className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 px-6 py-4 text-center text-red-600 dark:text-red-400 font-medium">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-4 py-12 sm:px-6 md:px-16 lg:px-24 transition-colors">
      <section className="mx-auto max-w-7xl rounded-[36px] border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F] dark:text-zinc-50 tracking-tight">
            Class Attendees
          </h1>
          <p className="mt-2 text-base text-[#5D6B57] dark:text-zinc-400">
            View members who booked your fitness classes.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 p-12 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-200">
              No attendees yet
            </h2>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Bookings for your classes will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(([classTitle, attendees]) => (
              <div
                key={classTitle}
                className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/20 transition-all shadow-sm"
              >
                {/* Header Section for each Class Group */}
                <div className="border-b border-[#A3B18A]/30 dark:border-zinc-800 bg-[#DDE5D0]/70 dark:bg-zinc-900/60 p-5">
                  <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">
                    {classTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[#5D6B57] dark:text-zinc-400">
                    Total attendees: <span className="font-bold text-[#2F3A2F] dark:text-zinc-200">{attendees.length}</span>
                  </p>
                </div>

                {/* Table Header Display on Desktop Layouts */}
                <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-4 border-b border-[#A3B18A]/30 dark:border-zinc-800 p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F] dark:text-zinc-400 md:grid">
                  <span>Member Profile</span>
                  <span>Payment Status</span>
                  <span>Booking Access</span>
                  <span>Registration Time</span>
                </div>

                {/* Attendees Iterative Listing rows */}
                <div className="divide-y divide-[#A3B18A]/20 dark:divide-zinc-800">
                  {attendees.map((booking) => (
                    <div
                      key={booking._id}
                      className="grid gap-4 p-5 sm:p-6 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:items-center hover:bg-white/40 dark:hover:bg-zinc-900/10 transition-colors"
                    >
                      {/* Left Block Info: Attendee User Details */}
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A3B18A]/40 dark:border-zinc-700 bg-[#EDF3E7] dark:bg-zinc-800">
                          {booking.userImage ? (
                            <Image
                              src={booking.userImage}
                              alt={booking.userName || "Attendee Profile"}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold text-[#4A6318] dark:text-zinc-300">
                              {booking.userName ? booking.userName.charAt(0).toUpperCase() : "M"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-[#2F3A2F] dark:text-zinc-100">
                            {booking.userName || "Unknown Member"}
                          </p>
                          <p className="truncate text-xs text-[#5D6B57] dark:text-zinc-400">
                            {booking.userEmail || "No email available"}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-gray-400 dark:text-zinc-500">
                            ID: {booking.userId}
                          </p>
                        </div>
                      </div>

                      {/* Payment Status Column */}
                      <div className="flex items-center md:block">
                        <span className="mr-2 text-xs font-medium text-gray-400 md:hidden">Payment: </span>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize tracking-wide ${
                            booking.paymentStatus === "approved"
                              ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-amber-950/40 text-yellow-700 dark:text-amber-400"
                          }`}
                        >
                          {booking.paymentStatus || "pending"}
                        </span>
                      </div>

                      {/* Booking Status Status Column */}
                      <div className="flex items-center md:block">
                        <span className="mr-2 text-xs font-medium text-gray-400 md:hidden">Access: </span>
                        <span className="inline-flex rounded-full bg-[#DDE5D0] dark:bg-zinc-800 px-3 py-1 text-xs font-bold capitalize tracking-wide text-[#556B2F] dark:text-zinc-300">
                          {booking.bookingStatus || "booked"}
                        </span>
                      </div>

                      {/* CreatedAt Date Column */}
                      <div className="flex items-center text-sm text-[#5D6B57] dark:text-zinc-400 md:block">
                        <span className="mr-2 text-xs font-medium text-gray-400 md:hidden">Booked On: </span>
                        <span>
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "No date recorded"}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
