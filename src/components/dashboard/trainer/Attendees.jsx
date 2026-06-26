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

        const res = await fetch(`${API_URL}/api/bookings/trainer/${trainerId}`);

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
    return <p className="p-10 text-center">Loading attendees...</p>;
  }

  if (role !== "trainer") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only trainers can manage attendees.
        </p>
      </main>
    );
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-7xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F]">
            Class Attendees
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            View members who booked your fitness classes.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">
              No attendees yet
            </h2>
            <p className="mt-2 text-[#5D6B57]">
              Bookings for your classes will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(([classTitle, attendees]) => (
              <div
                key={classTitle}
                className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white/60"
              >
                <div className="border-b border-[#A3B18A]/30 bg-[#DDE5D0]/70 p-5">
                  <h2 className="text-2xl font-bold text-[#2F3A2F]">
                    {classTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[#5D6B57]">
                    Total attendees: {attendees.length}
                  </p>
                </div>

                <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 p-4 text-sm font-bold text-[#2F3A2F] md:grid">
                  <span>Member</span>
                  <span>Payment</span>
                  <span>Booking</span>
                  <span>Booked Date</span>
                </div>

                <div className="divide-y divide-[#A3B18A]/20">
                  {attendees.map((booking) => (
                    <div
                      key={booking._id}
                      className="grid gap-4 p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center"
                    >
                      <div>
                        {/* <Image
                          src={session?.user?.image}
                          alt={session?.user?.name }
                          fill
                          className="object-cover"
                        /> */}
                        <p className="font-semibold text-[#2F3A2F]">Username</p>
                        <p className="text-sm text-[#5D6B57]">
                        {user?.name}
                        </p>
                        <p className="font-semibold text-[#2F3A2F]">User ID</p>
                        <p className="text-sm text-[#5D6B57]">
                          {booking.userId}
                          
                        </p>
                      </div>

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

                      <p className="text-sm text-[#5D6B57]">
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleString()
                          : "No date"}
                      </p>
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
