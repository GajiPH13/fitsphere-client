
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MemberFavoritesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const userId = user?.id;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
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
        if(!userId){
          return;
        }
        const res = await fetch(`${API_URL}/api/favorites/user/${userId}`,{
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch favorite classes");
        }

        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [API_URL, user, userId, role, isPending, router]);

  const handleRemoveFavorite = async (classId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this class from favorites?"
    );

    if (!confirmRemove) return;

    setRemovingId(classId);

    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: "DELETE",
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
        alert(data.message || "Failed to remove favorite");
        return;
      }

      setFavorites((prev) => prev.filter((item) => item._id !== classId));
      alert("Favorite removed successfully");
    } catch (error) {
      console.error("Remove favorite error:", error);
      alert("Something went wrong while removing favorite.");
    } finally {
      setRemovingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <p className="text-sm font-semibold text-[#2F3A2F] animate-pulse">Loading favorite classes...</p>
      </div>
    );
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-4">
        <div className="max-w-sm rounded-2xl border border-white/50 bg-white/60 p-6 text-center shadow-lg backdrop-blur-xl">
          <h1 className="text-xl font-black text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-1.5 text-xs text-[#5D6B57]">Only members can view favorite classes.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <p className="text-sm font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-10 md:px-10 lg:px-16 antialiased">
      
      {/* BACKGROUND MESH SYSTEM */}
      <div className="absolute top-12 left-1/4 h-64 w-64 rounded-full bg-[#6B8E23]/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 h-72 w-72 rounded-full bg-[#A3B18A]/20 blur-[70px] pointer-events-none" />

      <section className="relative mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/35 p-6 shadow-xl backdrop-blur-xl z-10">
        
        {/* COMPACT HEADER BLOCK */}
        <div className="mb-6 space-y-0.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A7A1E]">
            <span className="h-1 w-1 rounded-full bg-[#6B8E23]"></span>
            Saved Engine
          </span>
          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
            Favorite Classes
          </h1>
          <p className="text-xs font-medium text-[#5D6B57]/90">
            Your saved fitness classes organized into a fast, manageable space.
          </p>
        </div>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-white/50 bg-white/40 p-8 text-center backdrop-blur-sm">
            <h2 className="text-lg font-black text-[#2F3A2F]">No favorites yet</h2>
            <p className="mt-1 text-xs text-[#5D6B57]">
              Add classes to favorites from the class details view panel.
            </p>
          </div>
        ) : (
          
          /* CONDENSED CARD GRID */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <article
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/50 hover:shadow-lg"
              >
                {/* Image Box scaled down by 20% (h-56 -> h-44) */}
                <div className="relative h-44 w-full bg-[#DDE5D0] overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-bold text-[#556B2F]">
                      No Preview Available
                    </div>
                  )}
                </div>

                {/* Content Frame with tighter text margins */}
                <div className="flex flex-1 flex-col p-4 justify-between">
                  <div>
                    {/* Tighter badge tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-[#6B8E23]/10 px-2 py-0.5 text-[10px] font-bold text-[#5A7A1E]">
                        {item.category || "General"}
                      </span>
                      <span className="rounded-md bg-white/80 border border-white/40 px-2 py-0.5 text-[10px] font-bold text-[#5D6B57]">
                        {item.level || "All Levels"}
                      </span>
                    </div>

                    <h2 className="mt-2.5 text-lg font-black tracking-tight text-[#2F3A2F] line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="mt-0.5 text-xs font-medium text-[#5D6B57]/80">
                      Trainer: {item.trainer || item.trainerName || "Unknown"}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-normal text-[#4B5A42]">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Metrics Row (Tightened Spacing) */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold text-[#5D6B57] border-t border-white/30 pt-2.5">
                      <span className="flex items-center gap-1">⏱️ {item.duration}</span>
                      <span className="text-[#6B8E23]">${item.price || 0}</span>
                      <span className="line-clamp-1">📅 {item.schedule || "Not set"}</span>
                    </div>

                    {/* Compressed Action Row */}
                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/allclasses/${item._id}`}
                        className="flex-1 rounded-xl !bg-[#6B8E23] py-2 text-center text-xs font-bold !text-white shadow-sm transition hover:opacity-95"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        disabled={removingId === item._id}
                        onClick={() => handleRemoveFavorite(item._id)}
                        className="flex-1 rounded-xl bg-red-500/10 border border-red-200/40 py-2 text-xs font-bold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                      >
                        {removingId === item._id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}