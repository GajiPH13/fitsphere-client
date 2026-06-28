
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

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
  const [selectedClass, setSelectedClass] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isPending) return;

      if (!user) {
        router.replace("/auth/signin");
        return;
      }

      if (role !== "member") {
        setLoading(false);
        return;
      }

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/favorites/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch favorite classes");
        }

        setFavorites(data.favorites || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch favorite classes");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [API_URL, user, userId, role, isPending, router]);

  const openRemoveModal = (item) => {
    setSelectedClass(item);
    setIsOpen(true);
  };

  const closeRemoveModal = () => {
    setSelectedClass(null);
    setIsOpen(false);
  };

  const handleRemoveFavorite = async () => {
    if (!selectedClass?._id) {
      toast.error("No class selected.");
      return;
    }

    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    setRemovingId(selectedClass._id);

    const removePromise = async () => {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          userId,
          classId: selectedClass._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove favorite");
      }

      setFavorites((prev) =>
        prev.filter((item) => item._id !== selectedClass._id)
      );

      closeRemoveModal();

      return "Favorite removed successfully";
    };

    try {
      await toast.promise(removePromise(), {
        loading: "Removing favorite...",
        success: (message) => message,
        error: (err) =>
          err.message || "Something went wrong while removing favorite.",
      });
    } finally {
      setRemovingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <p className="animate-pulse text-sm font-semibold text-[#2F3A2F]">
          Loading favorite classes...
        </p>
      </div>
    );
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-4">
        <div className="max-w-sm rounded-2xl border border-white/50 bg-white/60 p-6 text-center shadow-lg backdrop-blur-xl">
          <h1 className="text-xl font-black text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-1.5 text-xs text-[#5D6B57]">
            Only members can view favorite classes.
          </p>
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-10 antialiased md:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/4 top-12 h-64 w-64 rounded-full bg-[#6B8E23]/10 blur-[60px]" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 h-72 w-72 rounded-full bg-[#A3B18A]/20 blur-[70px]" />

      <section className="relative z-10 mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/35 p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-6 space-y-0.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A7A1E]">
            <span className="h-1 w-1 rounded-full bg-[#6B8E23]" />
            Saved Engine
          </span>

          <h1 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
            Favorite Classes
          </h1>

          <p className="text-xs font-medium text-[#5D6B57]/90">
            Your saved fitness classes organized into a fast, manageable space.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-white/50 bg-white/40 p-8 text-center backdrop-blur-sm">
            <h2 className="text-lg font-black text-[#2F3A2F]">
              No favorites yet
            </h2>
            <p className="mt-1 text-xs text-[#5D6B57]">
              Add classes to favorites from the class details view panel.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <article
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/50 hover:shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#DDE5D0]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-bold text-[#556B2F]">
                      No Preview Available
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-[#6B8E23]/10 px-2 py-0.5 text-[10px] font-bold text-[#5A7A1E]">
                        {item.category || "General"}
                      </span>
                      <span className="rounded-md border border-white/40 bg-white/80 px-2 py-0.5 text-[10px] font-bold text-[#5D6B57]">
                        {item.level || "All Levels"}
                      </span>
                    </div>

                    <h2 className="mt-2.5 line-clamp-1 text-lg font-black tracking-tight text-[#2F3A2F]">
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
                    <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-white/30 pt-2.5 text-[11px] font-bold text-[#5D6B57]">
                      <span>⏱️ {item.duration}</span>
                      <span className="text-[#6B8E23]">${item.price || 0}</span>
                      <span className="line-clamp-1">
                        📅 {item.schedule || "Not set"}
                      </span>
                    </div>

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
                        onClick={() => openRemoveModal(item)}
                        className="flex-1 rounded-xl border border-red-200/40 bg-red-500/10 py-2 text-xs font-bold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-red-600">
              Remove Favorite
            </h2>

            <p className="mt-4 text-[#4B5A42]">
              Are you sure you want to remove{" "}
              <span className="font-bold text-[#2F3A2F]">
                {selectedClass?.title}
              </span>{" "}
              from your favorites?
            </p>

            <p className="mt-2 text-sm text-gray-500">
              You can add it again from the class details page.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={closeRemoveModal}
                isDisabled={Boolean(removingId)}
              >
                Cancel
              </Button>

              <Button
                color="danger"
                onPress={handleRemoveFavorite}
                isDisabled={Boolean(removingId)}
              >
                {removingId ? "Removing..." : "Remove"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}