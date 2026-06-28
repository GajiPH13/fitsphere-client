
// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Expert Trainers",
//     description:
//       "Learn from verified professionals who design safe, highly effective, and goal-focused fitness sessions tailored to you.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.296-1.593 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Flexible Booking",
//     description:
//       "Seamlessly reserve classes that match your personal schedule, difficulty level, and unique lifestyle interests anytime.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008z" />
//       </svg>
//     ),
//   },
//   {
//     title: "Progress Friendly",
//     description:
//       "Consistently scale your fitness journey with dynamic plan updates, favorited routines, and interactive community channels.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.284 5.941" />
//       </svg>
//     ),
//   },
// ];

// export default function WhyChooseFitSphere() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-6 py-28 md:px-16 lg:px-24 antialiased transition-colors duration-300">
      
//       {/* VIBRANT GLOW BLOB SYSTEM */}
//       <div className="absolute top-1/2 left-1/4 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[#6B8E23]/15 dark:bg-[#87A96B]/5 blur-[90px] pointer-events-none" />
//       <div className="absolute top-1/3 right-1/4 h-[420px] w-[420px] rounded-full bg-[#A3B18A]/35 dark:bg-zinc-800/10 blur-[100px] pointer-events-none" />

//       <div className="relative mx-auto max-w-7xl z-10">
        
//         {/* CENTERED BANNER TEXT BLOCK */}
//         <div className="mb-16 text-center space-y-4">
//           <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] dark:text-[#A3B18A] shadow-sm backdrop-blur-md">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23] dark:bg-[#A3B18A]"></span>
//             Why FitSphere
//           </span>

//           <h2 className="text-3xl font-(--font-plus-jakarta) font-weight-extrabold tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-4xl lg:text-5xl">
//             Fitness Made <span className="font-(--font-plus-jakarta) bg-linear-to-r from-[#6B8E23] to-[#3A5311] dark:from-[#87A96B] dark:to-[#6B8E23] bg-clip-text text-transparent">Simple.</span>
//           </h2>

//           <p className="mx-auto max-w-2xl text-lg font-(--font-plus-jakarta) font-weight-medium leading-relaxed text-[#5D6B57]/90 dark:text-zinc-400">
//             FitSphere helps members discover premium classes, coordinate instantly with elite local trainers,
//             and stay fully accountable with a supportive fitness community.
//           </p>
//         </div>

//         {/* GLASMORPHIC INTERACTIVE CARD GRID */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((item, index) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 35 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true, margin: "-50px" }}
//               whileHover={{ y: -6, scale: 1.01 }}
//               className="group relative overflow-hidden rounded-[36px] border border-white/60 dark:border-zinc-800/80 bg-white/35 dark:bg-zinc-900/20 p-8 shadow-xl shadow-slate-900/[0.02] dark:shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/55 dark:hover:bg-zinc-900/40 hover:shadow-2xl hover:shadow-[#2F3A2F]/5 dark:hover:shadow-black/20 flex flex-col justify-between"
//             >
//               <div>
//                 {/* GLASS CONTAINER ICON HOVER UNIT */}
//                 <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 dark:bg-zinc-900 text-[#6B8E23] dark:text-[#A3B18A] shadow-sm border border-white/40 dark:border-zinc-800 transition-all duration-300 group-hover:bg-[#6B8E23] dark:group-hover:bg-[#87A96B] group-hover:text-white dark:group-hover:text-zinc-950 group-hover:shadow-md group-hover:shadow-[#6B8E23]/20">
//                   {item.icon}
//                 </div>

//                 <h3 className="text-2xl font-(--font-plus-jakarta) font-weight-bold tracking-tight text-[#2F3A2F] dark:text-zinc-100">
//                   {item.title}
//                 </h3>

//                 <p className="mt-3 text-base font-(--font-plus-jakarta) font-weight-medium leading-relaxed text-[#5D6B57]/90 dark:text-zinc-400">
//                   {item.description}
//                 </p>
//               </div>

//               {/* CARD DECORATIVE BACKPLATE RING */}
//               <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border-4 border-[#6B8E23]/5 dark:border-[#87A96B]/5 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100 pointer-events-none" />
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function FitnessJourney() {
  // সার্ভার এবং ক্লায়েন্ট সাইডকে ১০০% সিঙ্ক রাখতে মাউন্ট স্টেট প্রোটেকশন গার্ড
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-24 md:px-16 lg:px-24 antialiased transition-colors duration-300">
      
      {/* GLOW DECORATIVE BACKGROUND */}
      <div className="absolute -bottom-10 left-1/3 h-[300px] w-[300px] rounded-full bg-[#6B8E23]/10 dark:bg-[#87A96B]/5 blur-[90px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* LEFT SIDE: INFOGRAPHICS OR BRAND FOCUS */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] dark:text-[#A3B18A] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23] dark:bg-[#A3B18A]"></span>
              Your Transformation
            </span>

            <h2 className="text-3xl font-(--font-plus-jakarta) font-weight-extrabold tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-5xl leading-tight">
              Start Your Fitness <br />
              <span className="bg-linear-to-r from-[#6B8E23] to-[#3A5311] dark:from-[#87A96B] dark:to-[#6B8E23] bg-clip-text text-transparent">Journey Today.</span>
            </h2>

            <p className="text-base md:text-lg font-(--font-plus-jakarta) font-weight-medium leading-relaxed text-[#5D6B57]/90 dark:text-zinc-400">
              Track your execution, book personal slots with tailored schedules, and progress with our specialized program modules. FitSphere adapts directly to your lifestyle demands.
            </p>

            {/* ERROR FIX: STABLE SINGLE-LINE CLASSNAMES WITHOUT LINE BREAKS */}
            <div className="pt-4">
              <Link
                href="/allclasses"
                className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] px-8 font-[family:var(--font-plus-jakarta)] text-base font-bold tracking-wide text-white dark:text-zinc-950 shadow-xl shadow-[#6B8E23]/20 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-2xl active:scale-[0.98]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: INTERACTIVE PREVIEW CARD */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/60 dark:border-zinc-800/80 bg-white/35 dark:bg-zinc-900/20 p-8 md:p-12 shadow-xl backdrop-blur-xl transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100 mb-4">
              Why Wait?
            </h3>
            <p className="text-sm leading-relaxed text-[#5D6B57] dark:text-zinc-400 mb-6">
              Over 5,000+ members have optimized their workflow, health metrics, and overall lifestyle dynamics using FitSphere's flexible model ecosystem.
            </p>
            <div className="h-2 w-full bg-[#DDE5D0] dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#6B8E23] dark:bg-[#87A96B] rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-3 text-xs font-bold text-[#5A7A1E] dark:text-[#A3B18A]">
              <span>75% Community Goal Reached</span>
              <span>Active</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}