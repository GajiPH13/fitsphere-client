
"use client";

import React, { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function ClassesPreview() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-6 py-28 md:px-16 lg:px-24 antialiased">
      
      {/* AMBIENT BACKGROUND GLOW DEPTH ELEMENTS */}
      <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[#6B8E23]/15 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 h-[350px] w-[350px] rounded-full bg-[#A3B18A]/30 blur-[90px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* HEADER AREA CONTAINER */}
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23]"></span>
              Trending Sessions
            </span>
            <h2 className="text-3xl font-(--font-plus-jakarta) tracking-tight text-[#2F3A2F] md:text-5xl">
              Popular Classes
            </h2>
            <p className="text-base font-medium text-[#5D6B57]/90 max-w-md">
              Join expertly designed training sessions led by premium certified instructors.
            </p>
          </div>

          {/* <Link 
            href="/allclasses" 
            className="group flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/40 px-6 py-3.5 text-sm font-bold text-[#2F3A2F] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-[#6B8E23]  hover:border-[#6B8E23] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link> */}
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
    View All Classes
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>
        </div>

        {/* LOADING STATE - GLASSMORPHIC SKELETON CARDS */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div 
                key={skeleton} 
                className="animate-pulse rounded-[32px] border border-white/60 bg-white/35 p-6 backdrop-blur-xl space-y-5 h-[380px] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-44 w-full rounded-2xl bg-white/50" />
                  <div className="h-6 w-3/4 rounded-lg bg-white/60" />
                  <div className="h-4 w-1/2 rounded-lg bg-white/40" />
                </div>
                <div className="h-11 w-full rounded-xl bg-white/50" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="rounded-[32px] border border-red-200/40 bg-red-50/40 p-12 text-center backdrop-blur-xl max-w-xl mx-auto shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#2F3A2F]">System Error</h4>
            <p className="mt-1 text-sm font-medium text-red-600/90">{error}</p>
          </div>
        )}

        {/* READY DATA GRID */}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((item) => (
              <ClassCard key={item._id} item={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}