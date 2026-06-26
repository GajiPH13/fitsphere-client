// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Expert Trainers",
//     description:
//       "Learn from verified trainers who design safe, effective, and goal-focused fitness sessions.",
//   },
//   {
//     title: "Flexible Booking",
//     description:
//       "Choose classes that match your schedule, level, and fitness interests anytime.",
//   },
//   {
//     title: "Progress Friendly",
//     description:
//       "Track your fitness journey with plans, bookings, favorites, and community support.",
//   },
// ];

// export default function WhyChooseFitSphere() {
//   return (
//     <section className="bg-[#EDF3E7] px-6 py-24 md:px-16 lg:px-24">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-14 text-center">
//           <span className="rounded-full bg-[#6B8E23]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5A7A1E]">
//             Why Choose Us
//           </span>

//           <h2 className="mt-5 text-4xl font-black text-[#2F3A2F] md:text-5xl">
//             Fitness Made Simple
//           </h2>

//           <p className="mx-auto mt-4 max-w-2xl text-[#5D6B57]">
//             FitSphere helps members discover classes, connect with trainers,
//             and stay consistent with a supportive fitness community.
//           </p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-3">
//           {features.map((item, index) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.45, delay: index * 0.12 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10, scale: 1.02 }}
//               className="rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-xl backdrop-blur-2xl"
//             >
//               <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6B8E23] text-2xl font-black text-white">
//                 {index + 1}
//               </div>

//               <h3 className="text-2xl font-bold text-[#2F3A2F]">
//                 {item.title}
//               </h3>

//               <p className="mt-4 leading-7 text-[#5D6B57]">
//                 {item.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Trainers",
    description:
      "Learn from verified professionals who design safe, highly effective, and goal-focused fitness sessions tailored to you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.296-1.593 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Flexible Booking",
    description:
      "Seamlessly reserve classes that match your personal schedule, difficulty level, and unique lifestyle interests anytime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008z" />
      </svg>
    ),
  },
  {
    title: "Progress Friendly",
    description:
      "Consistently scale your fitness journey with dynamic plan updates, favorited routines, and interactive community channels.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.284 5.941" />
      </svg>
    ),
  },
];

export default function WhyChooseFitSphere() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-6 py-28 md:px-16 lg:px-24 antialiased">
      
      {/* VIBRANT GLOW BLOB SYSTEM */}
      <div className="absolute top-1/2 left-1/4 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[#6B8E23]/15 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[420px] w-[420px] rounded-full bg-[#A3B18A]/35 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* CENTERED BANNER TEXT BLOCK */}
        <div className="mb-16 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E23]"></span>
            Why FitSphere
          </span>

          <h2 className="text-4xl font-black tracking-tight text-[#2F3A2F] md:text-5xl lg:text-6xl">
            Fitness Made <span className="bg-gradient-to-r from-[#6B8E23] to-[#3A5311] bg-clip-text text-transparent">Simple.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-[#5D6B57]/90">
            FitSphere helps members discover premium classes, coordinate instantly with elite local trainers,
            and stay fully accountable with a supportive fitness community.
          </p>
        </div>

        {/* GLASMORPHIC INTERACTIVE CARD GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[36px] border border-white/60 bg-white/35 p-8 shadow-xl shadow-slate-900/[0.02] backdrop-blur-xl transition-colors duration-300 hover:bg-white/55 hover:shadow-2xl hover:shadow-[#2F3A2F]/5 flex flex-col justify-between"
            >
              <div>
                {/* GLASS CONTAINER ICON HOVER UNIT */}
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-[#6B8E23] shadow-sm border border-white/40 transition-all duration-300 group-hover:bg-[#6B8E23] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#6B8E23]/20">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
                  {item.title}
                </h3>

                <p className="mt-3 text-base font-medium leading-relaxed text-[#5D6B57]/90">
                  {item.description}
                </p>
              </div>

              {/* CARD DECORATIVE BACKPLATE RING */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border-4 border-[#6B8E23]/5 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}