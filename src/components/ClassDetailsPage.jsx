
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = session?.user?.id;

  const role = session?.user?.role || "member";
  const plan = session?.user?.plan || "free";

  const isFreeUser = plan === "free";
  const isMemberWithPlan = role === "member" && ["starter", "pro"].includes(plan);
  const isTrainerWithPlan = role === "trainer" && plan === "trainer";

  const [classData, setClassData] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || isPending) return;

      if (!userId) {
        router.push("/signin");
        return;
      }

      try {
        setLoading(true);

        const classRes = await fetch(`${API_URL}/api/classes/${id}`);

        if (!classRes.ok) {
          throw new Error("Class not found");
        }

        const classResult = await classRes.json();

        const bookingRes = await fetch(
          `${API_URL}/api/bookings/check?userId=${userId}&classId=${id}`
        );
        const bookingResult = await bookingRes.json();

        const favoriteRes = await fetch(
          `${API_URL}/api/favorites/check?userId=${userId}&classId=${id}`
        );
        const favoriteResult = await favoriteRes.json();

        setClassData(classResult);
        setIsBooked(Boolean(bookingResult.alreadyBooked));
        setIsFavorite(Boolean(favoriteResult.isFavorite));
      } catch (error) {
        console.error("Failed to load class details:", error);
        setClassData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, userId, isPending, API_URL, router]);

  const handleBookNow = async () => {
    if (!userId) {
      router.push("/signin");
      return;
    }

    if (role === "admin") {
      alert("Admin cannot book classes");
      return;
    }

    if (isFreeUser) {
      alert("Please subscribe to a plan before booking classes.");
      // টাইপো ঠিক করা হয়েছে: /priceing -> /pricing
      router.push(`/priceing?redirect=/classes/${id}`);
      return;
    }

    if (isTrainerWithPlan) {
      alert("Trainer accounts cannot book classes.");
      return;
    }

    if (!isMemberWithPlan) {
      alert("Your current plan does not allow class booking.");
      return;
    }

    if (isBooked) {
      alert("You have already booked this class");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId: id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Booking failed");
        return;
      }

      setIsBooked(true);
      alert("Class booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!userId || !id) {
      alert("Please login first");
      router.push("/signin");
      return;
    }

    if (role === "admin") {
      alert("Admin cannot add favorites");
      return;
    }

    if (isFreeUser) {
      alert("Please subscribe to a plan before adding favorites.");
      // টাইপো ঠিক করা হয়েছে: /priceing -> /pricing
      router.push(`/pricing?redirect=/classes/${id}`);
      return;
    }

    if (!isMemberWithPlan && !isTrainerWithPlan) {
      alert("Your current plan does not allow favorites.");
      return;
    }

    if (isFavorite) {
      alert("This class is already in your favorites.");
      return;
    }

    setFavoriteLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId: id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Favorite action failed");
        return;
      }

      setIsFavorite(true);
      alert("Successfully added to your favorites!");
    } catch (error) {
      console.error("Favorite error:", error);
      alert("Something went wrong");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading || isPending) {
    return <p className="p-10 text-center text-zinc-600 dark:text-zinc-400">Loading class details...</p>;
  }

  if (!classData) {
    return <p className="p-10 text-center text-zinc-600 dark:text-zinc-400">Class not found</p>;
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-12 transition-colors duration-300">
      <section className="mx-auto grid max-w-6xl gap-10 rounded-[32px] border border-white/40 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        
        {/* LEFT COLUMN: IMAGE & BACK BUTTON */}
        <div className="flex flex-col justify-between gap-6">
          <Image
            src={classData.image}
            alt={classData.title}
            width={600}
            height={560}
            className="h-140 w-full rounded-[28px] object-cover border border-white/20 dark:border-zinc-800"
            priority
          />
          <div>
            <Link
              href="/allclasses"
              className="inline-flex items-center gap-1.5 rounded-full border border-white dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 px-5 py-2.5 text-xs font-bold text-[#2F3A2F] dark:text-zinc-300 shadow-sm backdrop-blur-md transition hover:bg-white/70 dark:hover:bg-zinc-800/70"
            >
              ← Back to all classes
            </Link>
          </div>
        </div>
        
        {/* RIGHT COLUMN: TEXT DETAILS & ACTIONS */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#DDE5D0] dark:bg-zinc-800 px-4 py-2 text-sm font-bold text-[#556B2F] dark:text-[#A3B18A]">
              {classData.level}
            </span>

            <h1 className="mt-6 text-4xl font-(--font-plus-jakarta) font-weight-extrabold text-[#2F3A2F] dark:text-zinc-50 md:text-5xl tracking-tight leading-tight">
              {classData.title}
            </h1>

            <p className="mt-3 text-lg font-medium text-[#5D6B57] dark:text-zinc-400">
              with {classData.trainer}
            </p>

            <p className="mt-6 leading-relaxed text-[#4B5A42] dark:text-zinc-300">
              {classData.description}
            </p>

            {/* Info Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Info label="Duration" value={classData.duration} />
              <Info label="Capacity" value={classData.capacity} />
              <Info label="Enrolled" value={classData.enrolledCount || 0} />
              <Info label="Rating" value={classData.rating} />
              <Info label="Schedule" value={classData.schedule || "Not set"} />
              <Info label="Price" value={`$${classData.price || 0}`} />
            </div>
          </div>

          {/* Action Buttons Group */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* Booking Button */}
            <button
              onClick={handleBookNow}
              disabled={isBooked || bookingLoading || isTrainerWithPlan}
              className={`w-full rounded-full py-4 font-bold text-white transition-all duration-300 active:scale-[0.98] ${
                isBooked || isTrainerWithPlan
                  ? "cursor-not-allowed bg-zinc-400 dark:bg-zinc-800 text-zinc-200 dark:text-zinc-500"
                  : "bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] dark:text-zinc-950 shadow-xl shadow-[#6B8E23]/10 hover:opacity-95 hover:shadow-2xl"
              }`}
            >
              {bookingLoading
                ? "Processing..."
                : isBooked
                ? "Already Booked"
                : isTrainerWithPlan
                ? "Trainer Cannot Book"
                : isFreeUser
                ? "Subscribe to Book"
                : "Book Now"}
            </button>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              disabled={favoriteLoading || isFavorite}
              className={`w-full rounded-full border py-4 font-bold transition-all duration-300 active:scale-[0.98] ${
                isFavorite
                  ? "cursor-not-allowed border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500"
                  : "border-[#A3B18A] dark:border-zinc-700 text-[#2F3A2F] dark:text-zinc-200 hover:bg-white/30 dark:hover:bg-zinc-800/30"
              }`}
            >
              {favoriteLoading
                ? "Updating..."
                : isFavorite
                ? "Saved to Favorites"
                : isFreeUser
                ? "Subscribe to Save"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 dark:bg-zinc-950/40 border border-white/40 dark:border-zinc-800/50 p-4 transition-colors duration-300">
      <p className="text-sm font-medium text-[#5D6B57] dark:text-zinc-400">{label}</p>
      <p className="mt-1 font-bold text-[#2F3A2F] dark:text-zinc-200">{value}</p>
    </div>
  );
}