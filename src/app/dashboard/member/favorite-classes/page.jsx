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

        const res = await fetch(`${API_URL}/api/favorites/user/${userId}`);

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
    return <p className="p-10 text-center">Loading favorite classes...</p>;
  }

  if (role !== "member") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only members can view favorite classes.
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
            Favorite Classes
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            Your saved fitness classes in one place.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">
              No favorites yet
            </h2>
            <p className="mt-2 text-[#5D6B57]">
              Add classes to favorites from the class details page.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <article
                key={item._id}
                className="overflow-hidden rounded-[32px] border border-white/40 bg-white/70 shadow-xl backdrop-blur-2xl"
              >
                <div className="relative h-56 bg-[#DDE5D0]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#556B2F]">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#DDE5D0] px-3 py-1 text-xs font-bold text-[#556B2F]">
                      {item.category || "General"}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5D6B57]">
                      {item.level || "All Levels"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-[#2F3A2F]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#5D6B57]">
                    Trainer: {item.trainer || item.trainerName || "Unknown"}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4B5A42]">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-[#5D6B57]">
                    <span>{item.duration}</span>
                    <span>${item.price || 0}</span>
                    <span>{item.schedule || "Schedule not set"}</span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/allclasses/${item._id}`}
                      className="flex-1 rounded-full bg-[#6B8E23] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#5A7A1E]"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      disabled={removingId === item._id}
                      onClick={() => handleRemoveFavorite(item._id)}
                      className="flex-1 rounded-full bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {removingId === item._id ? "Removing..." : "Remove"}
                    </button>
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