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

        const res = await fetch(`${API_URL}/api/bookings/user/${userId}`);

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
    return <p className="p-10 text-center">Loading bookings...</p>;
  }

  if (role !== "member") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only members can view booked classes.
        </p>
      </main>
    );
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-6xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F]">
            My Booked Classes
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            View all classes you have booked.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">
              No bookings found
            </h2>
            <p className="mt-2 text-[#5D6B57]">
              Your booked classes will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white/60">
            <div className="hidden grid-cols-[1.4fr_1fr_.7fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 bg-[#DDE5D0]/70 p-4 text-sm font-bold text-[#2F3A2F] md:grid">
              <span>Class</span>
              <span>Trainer</span>
              <span>Price</span>
              <span>Payment</span>
              <span>Booking</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-[#A3B18A]/20">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid gap-4 p-4 md:grid-cols-[1.4fr_1fr_.7fr_1fr_1fr_1fr] md:items-center"
                >
                  <div>
                    <p className="font-bold text-[#2F3A2F]">
                      {booking.classTitle || "Unknown Class"}
                    </p>
                    <p className="mt-1 text-xs text-[#5D6B57]">
                      Booked:{" "}
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleString()
                        : "No date"}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-[#4B5A42]">
                    {booking.trainer || "Unknown"}
                  </p>

                  <p className="text-sm font-bold text-[#2F3A2F]">
                    ${booking.price || 0}
                  </p>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                      booking.paymentStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.paymentStatus || "pending"}
                  </span>

                  <span className="w-fit rounded-full bg-[#DDE5D0] px-3 py-1 text-xs font-bold capitalize text-[#556B2F]">
                    {booking.bookingStatus || "booked"}
                  </span>

                  <div className="md:text-right">
                    <Link
                      href={`/allclasses/${booking.classId}`}
                      className="inline-flex rounded-full border border-[#A3B18A] px-4 py-2 text-sm font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
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