
// 'use client';

// import React from 'react';
// import { Card } from '@heroui/react';
// import Link from 'next/link'; // Next.js native navigation এর জন্য Link ইম্পোর্ট নিশ্চিত করা হয়েছে
// import { ArrowRight } from '@gravity-ui/icons';
// import { useSession } from '@/lib/auth-client';

// export default function HeroSection() {
//   const { data: session } = useSession();
  
  
//   const trainerLink = session?.user?.role === "member"
//     ? "/dashboard/member/apply-trainer"
//     : "/priceing";

//   return (
//     <div className="w-full bg-[#EEF3E8] dark:bg-zinc-950 py-16 md:py-24 lg:py-28 px-4 antialiased transition-colors duration-300">
//       <section className="relative max-w-7xl mx-auto min-h-[75vh] lg:min-h-[80vh] rounded-[36px] overflow-hidden shadow-2xl flex items-center p-6 sm:p-12 md:p-16 lg:p-20 border border-white/10 dark:border-zinc-800/50">
        
//         {/* --- PHOTOGRAPHIC BACKGROUND LAYER WITH INTEGRATED GRADIENT MASK --- */}
//         <div 
//           className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-100 transition-transform duration-1000"
//           style={{ backgroundImage: "url('/HeroPic.png')" }}
//         />
//         {/* Darkening/Color-balancing overlay gradient - ডার্ক মোডে ব্যাকগ্রাউন্ড ইমেজকে কিছুটা ডার্ক করবে যেন টেক্সট সহজে পড়া যায় */}
//         <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent dark:from-black/70 dark:via-black/50 dark:to-black/30 pointer-events-none" />

//         {/* --- METALLIC SHIMMER LIGHT REFLECTION BLOB --- */}
//         <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-white/10 dark:bg-white/5 blur-3xl pointer-events-none z-1" />

//         {/* --- PREMIUM GLASSMORPHIC CARD OVERLAY --- */}
//         <Card className="relative z-10 max-w-xl w-full backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border border-white/50 dark:border-zinc-700/30 shadow-[0_24px_50px_-12px_rgba(47,58,47,0.18)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:bg-white/35 dark:hover:bg-zinc-900/40">
          
//           <div className="flex flex-col gap-6">
            
//             {/* Context Badge */}
//             <div>
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3A5311] dark:text-[#A3B18A] shadow-sm backdrop-blur-md">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[#87A96B] dark:bg-[#A3B18A] animate-pulse"></span>
//                 FitSphere Platform
//               </span>
//             </div>

//             {/* Card Heading */}
//             <h1 className="text-3xl font-(--font-plus-jakarta) font-weight-semibold md:text-4xl tracking-tight text-[#1C261C] dark:text-zinc-100 leading-[1.15]">
//               Ready to Transform Your{" "}
//               <span className="bg-linear-to-r from-[#3A5311] to-[#6B8E23] dark:from-[#A3B18A] dark:to-[#6B8E23] bg-clip-text text-transparent">
//                 Fitness Journey?
//               </span>
//             </h1>
            
//             {/* Description Text */}
//             <p className="text-base text-[#3D4A3D] dark:text-zinc-300 font-(--font-plus-jakarta) font-weight-medium leading-relaxed">
//               Join a global ecosystem of health enthusiasts and certified personal trainers. Choose your path below to get started immediately.
//             </p>

//             {/* Action Buttons Row */}
//             <div className="mt-4 flex flex-col items-stretch sm:items-center gap-4 sm:flex-row">
//               {/* Primary Action Button */}
//               <Link
//                 href="/allclasses"
//                 className="
//                   group
//                   inline-flex
//                   h-14
//                   items-center
//                   justify-center
//                   gap-3
//                   rounded-full
//                   bg-linear-to-r
//                   from-[#6B8E23]
//                   to-[#5A7A1E]
//                   dark:from-[#87A96B]
//                   dark:to-[#6B8E23]
//                   px-8
//                   font-(--font-plus-jakarta)
//                   font-weight-bold
//                   text-white
//                   dark:text-zinc-950
//                   shadow-xl
//                   shadow-[#6B8E23]/20
//                   dark:shadow-black/20
//                   transition-all
//                   duration-300
//                   hover:-translate-y-0.5
//                   hover:opacity-95
//                   hover:shadow-2xl
//                   hover:shadow-[#6B8E23]/30
//                   dark:hover:shadow-[#87A96B]/20
//                   active:scale-[0.98]
//                 "
//               >
//                 Explore Classes
//                 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </Link>

//               {/* Secondary Action Button */}
//               <Link
//                 href={trainerLink}
//                 className="
//                   inline-flex
//                   h-14
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-white/60
//                   dark:border-zinc-700/50
//                   bg-white/40
//                   dark:bg-zinc-800/40
//                   px-8
//                   font-(--font-plus-jakarta)
//                   font-weight-bold
//                   text-[#1C261C]
//                   dark:text-zinc-200
//                   shadow-sm
//                   backdrop-blur-md
//                   transition-all
//                   duration-300
//                   hover:-translate-y-0.5
//                   hover:border-white
//                   dark:hover:border-zinc-600
//                   hover:bg-white/60
//                   dark:hover:bg-zinc-800/60
//                   active:scale-[0.98]
//                 "
//               >
//                 Join as Trainer
//               </Link>
//             </div>

//           </div>
//         </Card>
        
//       </section>
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@heroui/react';
import Link from 'next/link'; 
import { ArrowRight } from '@gravity-ui/icons';
import { useSession } from '@/lib/auth-client';

export default function HeroSection() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন এরর ব্লক করতে মাউন্ট চেক নিশ্চিত করা হলো
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }
  
  const trainerLink = session?.user?.role === "member"
    ? "/dashboard/member/apply-trainer"
    : "/priceing";

  return (
    <div className="w-full bg-[#EEF3E8] dark:bg-zinc-950 py-16 md:py-24 lg:py-28 px-4 antialiased transition-colors duration-300">
      <section className="relative max-w-7xl mx-auto min-h-[75vh] lg:min-h-[80vh] rounded-[36px] overflow-hidden shadow-2xl flex items-center p-6 sm:p-12 md:p-16 lg:p-20 border border-white/10 dark:border-zinc-800/50">
        
        {/* --- PHOTOGRAPHIC BACKGROUND LAYER WITH INTEGRATED GRADIENT MASK --- */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-100 transition-transform duration-1000"
          style={{ backgroundImage: "url('/HeroPic.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent dark:from-black/70 dark:via-black/50 dark:to-black/30 pointer-events-none" />

        {/* --- METALLIC SHIMMER LIGHT REFLECTION BLOB --- */}
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-white/10 dark:bg-white/5 blur-3xl pointer-events-none z-1" />

        {/* --- PREMIUM GLASSMORPHIC CARD OVERLAY --- */}
        <Card className="relative z-10 max-w-xl w-full backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border border-white/50 dark:border-zinc-700/30 shadow-[0_24px_50px_-12px_rgba(47,58,47,0.18)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:bg-white/35 dark:hover:bg-zinc-900/40">
          
          <div className="flex flex-col gap-6">
            
            {/* Context Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3A5311] dark:text-[#A3B18A] shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#87A96B] dark:bg-[#A3B18A] animate-pulse"></span>
                FitSphere Platform
              </span>
            </div>

            {/* Card Heading */}
            <h1 className="text-3xl font-(--font-plus-jakarta) font-weight-semibold md:text-4xl tracking-tight text-[#1C261C] dark:text-zinc-100 leading-[1.15]">
              Ready to Transform Your{" "}
              <span className="bg-linear-to-r from-[#3A5311] to-[#6B8E23] dark:from-[#A3B18A] dark:to-[#6B8E23] bg-clip-text text-transparent">
                Fitness Journey?
              </span>
            </h1>
            
            {/* Description Text */}
            <p className="text-base text-[#3D4A3D] dark:text-zinc-300 font-(--font-plus-jakarta) font-weight-medium leading-relaxed">
              Join a global ecosystem of health enthusiasts and certified personal trainers. Choose your path below to get started immediately.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-4 flex flex-col items-stretch sm:items-center gap-4 sm:flex-row">
              
              {/* Primary Action Button */}
              <Link
                href="/allclasses"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] px-8 font-[family:var(--font-plus-jakarta)] text-base font-bold tracking-wide text-white dark:text-zinc-950 shadow-xl shadow-[#6B8E23]/20 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-2xl active:scale-[0.98]"
              >
                <span>Explore Classes</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Action Button */}
              <Link
                href={trainerLink}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/60 dark:border-zinc-700/50 bg-white/40 dark:bg-zinc-800/40 px-8 font-[family:var(--font-plus-jakarta)] text-base font-bold tracking-wide text-[#1C261C] dark:text-zinc-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white dark:hover:border-zinc-600 hover:bg-white/60 dark:hover:bg-zinc-800/60 active:scale-[0.98]"
              >
                Join as Trainer
              </Link>
              
            </div>

          </div>
        </Card>
        
      </section>
    </div>
  );
}