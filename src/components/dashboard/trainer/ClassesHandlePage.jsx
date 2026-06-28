
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TrainerClassesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const trainerId = user?.id;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainerClasses = async () => {
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
        if (!trainerId) {
          return;
        }
        const res = await fetch(`${API_URL}/api/classes/trainer/${trainerId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch your classes");
        }

        const data = await res.json();
        setClasses(data.classes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerClasses();
  }, [API_URL, user, role, trainerId, isPending, router]);

  const getStatusInfo = (status) => {
    if (status === "approved") {
      return {
        label: "Live on public classes page",
        className: "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400",
      };
    }

    if (status === "rejected") {
      return {
        label: "Rejected by admin",
        className: "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400",
      };
    }

    return {
      label: "Waiting for admin approval",
      className: "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    };
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 transition-colors">
        <p className="text-sm font-semibold text-[#2F3A2F] dark:text-zinc-200 animate-pulse tracking-wide">
          Loading your classes...
        </p>
      </div>
    );
  }

  if (role !== "trainer") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 text-center transition-colors">
        <h1 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-50">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57] dark:text-zinc-400">
          Only trainers can view their classes.
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] dark:bg-zinc-950 transition-colors">
        <p className="text-center text-red-500 dark:text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-12 md:px-16 lg:px-24 transition-colors">
      <section className="mx-auto max-w-7xl rounded-[36px] border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#2F3A2F] dark:text-zinc-50">My Classes</h1>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Track your submitted classes and admin approval status.
            </p>
          </div>

          <Link
            href="/dashboard/trainer/classes/create"
            className="inline-flex items-center justify-center rounded-full bg-[#6B8E23] px-7 py-3 font-bold text-white dark:text-zinc-100 border-2 border-[#4F6B1B] dark:border-zinc-700 shadow-xl hover:bg-[#55741C] dark:hover:bg-zinc-800 transition-all text-sm"
          >
            + Create New Class
          </Link>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">
              No classes yet
            </h2>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Create your first class and submit it for admin approval.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {classes.map((item) => {
              const statusInfo = getStatusInfo(item.status);

              return (
                <article
                  key={item._id}
                  className="grid gap-5 rounded-[28px] border border-white/50 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/30 p-5 shadow-lg backdrop-blur-xl md:grid-cols-[180px_1fr_auto]"
                >
                  {/* Class Media Shell */}
                  <div className="relative h-36 overflow-hidden rounded-3xl bg-[#DDE5D0] dark:bg-zinc-800">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#556B2F] dark:text-zinc-400 text-sm font-medium">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Class Details Container */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>

                      <span className="rounded-full bg-[#DDE5D0] dark:bg-zinc-800 px-3 py-1 text-xs font-bold text-[#556B2F] dark:text-zinc-300">
                        {item.category || "General"}
                      </span>

                      <span className="rounded-full bg-white dark:bg-zinc-950 border border-transparent dark:border-zinc-800 px-3 py-1 text-xs font-bold text-[#5D6B57] dark:text-zinc-400">
                        {item.level}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">
                      {item.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4B5A42] dark:text-zinc-300">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[#5D6B57] dark:text-zinc-400">
                      <span>Schedule: {item.schedule || "Not set"}</span>
                      <span>Price: ${item.price || 0}</span>
                      <span>Capacity: {item.capacity}</span>
                    </div>
                  </div>

                    {/* Actions panel */}
                  <div className="flex items-center md:justify-end">
                    <Link
                      href={`/allclasses/${item._id}`}
                      className="rounded-full border border-[#A3B18A] dark:border-zinc-700 px-5 py-2 text-sm font-semibold text-[#2F3A2F] dark:text-zinc-200 transition bg-white dark:bg-zinc-800/40 hover:bg-[#DDE5D0] dark:hover:bg-zinc-800"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}