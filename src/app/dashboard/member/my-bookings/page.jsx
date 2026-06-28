// "use client";

// import React, { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function MemberBookingsPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   const user = session?.user;
//   const role = user?.role;
//   const userId = user?.id;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (isPending) return;

//       if (!user) {
//         router.push("/auth/signin");
//         return;
//       }

//       if (role !== "member") {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         if(!userId){
//           return;
//         }
//         const res = await fetch(`${API_URL}/api/bookings/user/${userId}`,{
//           headers: {
//             "Content-Type": "application/json",
//             "x-user-id": user.id,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch bookings");
//         }

//         const data = await res.json();
//         setBookings(data.bookings || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [API_URL, user, userId, role, isPending, router]);

//   if (isPending || loading) {
//     return <p className="p-10 text-center">Loading bookings...</p>;
//   }

//   if (role !== "member") {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only members can view booked classes.
//         </p>
//       </main>
//     );
//   }

//   if (error) {
//     return <p className="p-10 text-center text-red-500">{error}</p>;
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-6xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
//         <div className="mb-10">
//           <h1 className="text-4xl font-black text-[#2F3A2F]">
//             My Booked Classes
//           </h1>
//           <p className="mt-2 text-[#5D6B57]">
//             View all classes you have booked.
//           </p>
//         </div>

//         {bookings.length === 0 ? (
//           <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
//             <h2 className="text-2xl font-bold text-[#2F3A2F]">
//               No bookings found
//             </h2>
//             <p className="mt-2 text-[#5D6B57]">
//               Your booked classes will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white/60">
//             <div className="hidden grid-cols-[1.4fr_1fr_.7fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 bg-[#DDE5D0]/70 p-4 text-sm font-bold text-[#2F3A2F] md:grid">
//               <span>Class</span>
//               <span>Trainer</span>
//               <span>Price</span>
//               <span>Payment</span>
//               <span>Booking</span>
//               <span className="text-right">Action</span>
//             </div>

//             <div className="divide-y divide-[#A3B18A]/20">
//               {bookings.map((booking) => (
//                 <div
//                   key={booking._id}
//                   className="grid gap-4 p-4 md:grid-cols-[1.4fr_1fr_.7fr_1fr_1fr_1fr] md:items-center"
//                 >
//                   <div>
//                     <p className="font-bold text-[#2F3A2F]">
//                       {booking.classTitle || "Unknown Class"}
//                     </p>
//                     <p className="mt-1 text-xs text-[#5D6B57]">
//                       Booked:{" "}
//                       {booking.createdAt
//                         ? new Date(booking.createdAt).toLocaleString()
//                         : "No date"}
//                     </p>
//                   </div>

//                   <p className="text-sm font-medium text-[#4B5A42]">
//                     {booking.trainer || "Unknown"}
//                   </p>

//                   <p className="text-sm font-bold text-[#2F3A2F]">
//                     ${booking.price || 0}
//                   </p>

//                   <span
//                     className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
//                       booking.paymentStatus === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {booking.paymentStatus || "pending"}
//                   </span>

//                   <span className="w-fit rounded-full bg-[#DDE5D0] px-3 py-1 text-xs font-bold capitalize text-[#556B2F]">
//                     {booking.bookingStatus || "booked"}
//                   </span>

//                   <div className="md:text-right">
//                     <Link
//                       href={`/allclasses/${booking.classId}`}
//                       className="inline-flex rounded-full border border-[#A3B18A] px-4 py-2 text-sm font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }
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
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-white/40 bg-white/40 px-8 py-5 shadow-xl backdrop-blur-md">
          <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse tracking-wide">
            Loading bookings workspace...
          </p>
        </div>
      </div>
    );
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="max-w-md w-full rounded-[32px] border border-white/50 bg-white/50 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-[#5D6B57]">
            Only members can view booked classes.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50/50 p-6 text-center backdrop-blur-md">
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-12 md:px-8 lg:px-16 antialiased relative overflow-hidden">
      {/* Eye-catching glassmorphic background ambient glows */}
      <div className="absolute top-[-5%] left-[-5%] h-96 w-96 rounded-full bg-[#6B8E23]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] h-[450px] w-[450px] rounded-full bg-[#2F3A2F]/5 blur-[140px] pointer-events-none" />

      <section className="relative mx-auto max-w-6xl z-10 rounded-[32px] border border-white/50 bg-white/35 p-6 md:p-10 shadow-xl backdrop-blur-xl">
        <div className="mb-8 relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6B8E23]/20 bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5A7A1E] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23]" />
            Member Portal
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2F3A2F] md:text-4xl">
            My Booked Classes
          </h1>
          <p className="mt-2 text-sm font-medium text-[#5D6B57]/90">
            Track your schedule, verified receipts, and ongoing active session access.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-white bg-white/40 p-12 text-center shadow-sm backdrop-blur-md">
            <h2 className="text-xl font-black tracking-tight text-[#2F3A2F]">
              No bookings found
            </h2>
            <p className="mt-1.5 text-xs font-medium text-[#5D6B57]/90">
              Your scheduled sessions and dashboard updates will live here.
            </p>
          </div>
        ) : (
          /* Custom Table Layout built with clean glassmorphic panels */
          <div className="overflow-hidden rounded-2xl border border-white bg-white/30 shadow-md backdrop-blur-md">
            {/* Header */}
            <div className="hidden grid-cols-[1.4fr_1fr_0.7fr_1fr_1fr_1fr] gap-4 border-b border-white/40 bg-white/50 p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 md:grid">
              <span>Class Info</span>
              <span>Instructor</span>
              <span>Price</span>
              <span>Payment State</span>
              <span>Session Status</span>
              <span className="text-right">Action</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/30">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid gap-3 p-4 sm:p-5 md:grid-cols-[1.4fr_1fr_0.7fr_1fr_1fr_1fr] md:gap-4 md:items-center transition-all duration-200 hover:bg-white/30"
                >
                  {/* Mobile labels embedded using standard flex arrangements */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[#5D6B57]/60 uppercase tracking-wide md:hidden">Class</span>
                    <p className="font-black text-base md:text-sm tracking-tight text-[#2F3A2F]">
                      {booking.classTitle || "Unknown Class"}
                    </p>
                    <p className="text-xs font-medium text-[#5D6B57]/80">
                      Booked:{" "}
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })
                        : "No date"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 uppercase tracking-wide md:hidden">Instructor</span>
                    <p className="text-sm font-semibold text-[#4B5A42]">
                      {booking.trainer || "Unknown"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 uppercase tracking-wide md:hidden">Price</span>
                    <p className="text-sm font-black text-[#2F3A2F]">
                      ${booking.price || 0}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 uppercase tracking-wide md:hidden">Payment State</span>
                    <span
                      className={`w-fit inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                        booking.paymentStatus === "approved"
                          ? "bg-green-500/10 border-green-500/20 text-green-700"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-700"
                      }`}
                    >
                      {booking.paymentStatus || "pending"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 md:block">
                    <span className="text-xs font-bold text-[#5D6B57]/60 uppercase tracking-wide md:hidden">Session Status</span>
                    <span className="w-fit inline-flex items-center rounded-full border border-[#6B8E23]/20 bg-white/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5A7A1E] shadow-sm">
                      {booking.bookingStatus || "booked"}
                    </span>
                  </div>

                  <div className="mt-2 flex md:mt-0 md:justify-end">
                    <Link
                      href={`/allclasses/${booking.classId}`}
                      className="w-full text-center md:w-auto inline-flex items-center justify-center rounded-full border border-white bg-white px-4 py-2 text-xs font-bold text-[#2F3A2F] shadow-sm transition-all duration-200 hover:bg-[#6B8E23]/10 hover:text-[#5A7A1E] hover:border-[#6B8E23]/20"
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