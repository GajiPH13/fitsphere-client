
"use client";

import React, { useEffect, useState } from "react";
import { Star, Clock, Persons, Heart, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function ClassCard({ item }) {
  const { data: session } = useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const userId = session?.user?.id;
  const classId = item?._id;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const detailsLink = session?.user ? `/allclasses/${classId}` : "/auth/signin";

  useEffect(() => {
    const checkFavorite = async () => {
      if (!userId || !classId) return;

      try {
        const res = await fetch(
          `${API_URL}/api/favorites/check?userId=${userId}&classId=${classId}`
        );

        const data = await res.json();

        if (res.ok) {
          setIsFavorite(Boolean(data.isFavorite));
        }
      } catch (error) {
        console.error("Favorite check error:", error);
      }
    };

    checkFavorite();
  }, [API_URL, userId, classId]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      window.location.href = "/auth/signin";
      return;
    }

    setFavoriteLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Favorite action failed");
        return;
      }

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert("Something went wrong.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <div className="group relative w-full max-w-[420px] rounded-[32px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:-translate-y-3">
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-sm font-medium text-[#556B2F]">
          {item.level}
        </div>

        <button
          type="button"
          onClick={handleFavoriteToggle}
          disabled={favoriteLoading}
          className={`absolute top-5 right-5 h-12 w-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 border-red-400"
              : "bg-white/30 border-white/40"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className="text-white" />
        </button>
      </div>

      <div className="relative -mt-10 mx-3 rounded-[30px] bg-white/75 backdrop-blur-2xl border border-white/50 p-6 z-10">
        <h3 className="text-2xl font-(--font-plus-jakarta) font-weight-extrabold text-[#1F2A1F]">{item.title}</h3>

        <p className="mt-2 text-lg text-[#4B5A42]">
          with {item.trainer || item.trainerName}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {item.description?.length > 100
            ? `${item.description.substring(0, 100)}...`
            : item.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="text-[#6B8E23]" />
            </div>
            <p className="font-semibold">{item.duration}</p>
            <p className="text-xs text-gray-500 mt-1">Duration</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Persons className="text-[#6B8E23]" />
            </div>
            <p className="font-semibold">{item.capacity}</p>
            <p className="text-xs text-gray-500 mt-1">Total Spots</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Star className="text-[#D4A017]" />
            </div>
            <p className="font-semibold">{item.rating}</p>
            <p className="text-xs text-gray-500 mt-1">Rating</p>
          </div>
        </div>

        {/* <Link
          href={detailsLink}
          className="mt-6 block text-center w-full py-3 rounded-full !bg-[#6B8E23] text-white text-lg font-semibold shadow-lg transition hover:brightness-110"
        >
          View Details
        </Link> */}
        <Link
    href={detailsLink}
    className="
      w-full
      group
      inline-flex
      h-14
      items-center
      justify-center
      gap-3
      rounded-full
      bg-linear-to-r
      from-[#6B8E23]
      to-[#5A7A1E]
      px-8
      font-(--font-plus-jakarta)
      font-weight-bold
      text-white
      shadow-xl
      shadow-[#6B8E23]/20
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:opacity-95
      hover:shadow-2xl
      hover:shadow-[#6B8E23]/30
      active:scale-[0.98]
    "
  >
    View Details
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>
      </div>
    </div>
  );
}