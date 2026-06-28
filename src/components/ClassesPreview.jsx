
"use client";

import React, { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function ClassesPreview() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchClasses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/classes?limit=3");

        if (!res.ok) {
          throw new Error("Failed to load standard class configurations");
        }

        const data = await res.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-[400px] bg-gradient-to-br from-[#EDF3E7] to-[#D5E2C4] dark:from-zinc-950 dark:to-zinc-950" />
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-20 md:px-12 lg:px-24 antialiased transition-colors duration-300">
      
      {/* AMBIENT BACKGROUND GLOW DEPTH ELEMENTS */}
      <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[#6B8E23]/15 dark:bg-[#87A96B]/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 h-[350px] w-[350px] rounded-full bg-[#A3B18A]/30 dark:bg-zinc-800/10 blur-[90px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* HEADER AREA CONTAINER */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] dark:text-[#A3B18A] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23] dark:bg-[#A3B18A]"></span>
              Trending Sessions
            </span>
            <h2 className="text-3xl tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-4xl lg:text-5xl font-bold">
              Popular Classes
            </h2>
            <p className="text-base font-medium text-[#5D6B57]/90 dark:text-zinc-400 max-w-md">
              Join expertly designed training sessions led by premium certified instructors.
            </p>
          </div>

          {/* View All Classes Button */}
          <Link
            href="/allclasses"
            className="
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
              dark:from-[#87A96B]
              dark:to-[#6B8E23]
              px-8
              font-bold
              text-white
              dark:text-zinc-950
              shadow-xl
              shadow-[#6B8E23]/20
              dark:shadow-black/40
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:opacity-95
              hover:shadow-2xl
              hover:shadow-[#6B8E23]/30
              dark:hover:shadow-[#87A96B]/20
              active:scale-[0.98]
              shrink-0
              w-full sm:w-fit
            "
          >
            View All Classes
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* LOADING STATE - (Optimized for px-4 Small Screens) */}
        {loading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center items-center">
            {[1, 2, 3].map((skeleton) => (
              <div 
                key={skeleton} 
                className="animate-pulse rounded-[32px] border border-white/60 dark:border-zinc-800/80 bg-white/35 dark:bg-zinc-900/20 p-5 backdrop-blur-xl space-y-5 h-[380px] w-full max-w-[360px] sm:max-w-sm flex flex-col justify-between mx-auto"
              >
                <div className="space-y-3">
                  <div className="h-44 w-full rounded-2xl bg-white/50 dark:bg-zinc-800/50" />
                  <div className="h-6 w-3/4 rounded-lg bg-white/60 dark:bg-zinc-700/40" />
                  <div className="h-4 w-1/2 rounded-lg bg-white/40 dark:bg-zinc-700/20" />
                </div>
                <div className="h-11 w-full rounded-xl bg-white/50 dark:bg-zinc-800/40" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="rounded-[32px] border border-red-200/40 dark:border-red-900/30 bg-red-50/40 dark:bg-red-950/10 p-8 text-center backdrop-blur-xl max-w-xl mx-auto shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#2F3A2F] dark:text-zinc-200">System Error</h4>
            <p className="mt-1 text-sm font-medium text-red-600/90 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* READY DATA GRID - (Compact Layout for Small Devices) */}
        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center items-center">
            {classes.map((item) => (
              <div key={item._id} className="w-full max-w-[360px] sm:max-w-sm mx-auto flex justify-center">
                <ClassCard item={item} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}