// // 'use client';

// // import React from 'react';
// // import { Button, Link } from '@heroui/react';

// // export default function HeroSection() {
// //   return (
// //     <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f4f7f4] via-[#ecf1ec] to-[#e2eae2] py-20 px-4">
      
// //       {/* --- AMBIENT BACKDROP LAYER --- */}
// //       <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-[#87A96B]/20 to-[#aecea3]/15 blur-3xl pointer-events-none" />
// //       <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#4A5D4E]/10 to-[#87A96B]/15 blur-3xl pointer-events-none" />

// //       {/* --- MAIN FULL-WIDTH CONTAINER --- */}
// //       <div className="relative z-10 max-w-5xl w-full text-center sm:text-left backdrop-blur-xl bg-white/30 border border-white/40 shadow-[0_8px_32px_0_rgba(74,93,78,0.06)] rounded-3xl p-8 md:p-16">
        
// //         {/* Badge indicator */}
// //         <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#4A5D4E]/10 text-[#4A5D4E] mb-6">
// //           ✨ Your All-In-One Fitness Ecosystem
// //         </span>

// //         {/* Main Headline */}
// //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2d3a30] leading-[1.15] mb-6 max-w-3xl">
// //           Empower Your Journey. <br />
// //           <span className="bg-gradient-to-r from-[#4A5D4E] to-[#6b8470] bg-clip-text text-transparent">
// //             Elevate Your Fitness.
// //           </span>
// //         </h1>

// //         {/* Subheadline */}
// //         <p className="text-base md:text-lg text-[#556459] font-medium leading-relaxed mb-8 max-w-2xl">
// //           Discover elite fitness classes, book seamless sessions, and track your metrics. A unified space where enthusiasts thrive, trainers scale their businesses, and communities connect safely.
// //         </p>

// //         {/* Call To Action Buttons (HeroUI v3.1.0) */}
// //         <div className="flex flex-col sm:flex-row gap-4 justify-start">
// //           <Button
// //             as={Link}
// //             href="/classes"
// //             size="lg"
// //             className="bg-[#87A96B] hover:bg-[#76985a] text-white font-bold shadow-lg shadow-[#87A96B]/20 transition-transform active:scale-95 px-10 h-14 rounded-xl"
// //           >
// //             Explore Classes
// //           </Button>
          
// //           <Button
// //             as={Link}
// //             href="/register?role=trainer"
// //             variant="bordered"
// //             size="lg"
// //             className="border-2 border-[#4A5D4E]/30 hover:border-[#4A5D4E] text-[#4A5D4E] bg-white/20 hover:bg-white/40 font-bold transition-colors px-10 h-14 rounded-xl"
// //           >
// //             Join as Trainer
// //           </Button>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }
// 'use client';

// import React from 'react';
// import { Button, Card, Link } from '@heroui/react';

// export default function HeroSection() {
//   return (
//     <div className="w-full bg-[#EEF3E8] pt-30 pb-20  px-4">
//         <section className="relative  max-w-7xl mx-auto min-h-[75vh]  overflow-hidden ">
      
//       {/* --- REAL IMAGE BACKGROUND LAYER --- */}
//       <div 
//         className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat rounded-3xl "
//         style={{ backgroundImage: "url('/HeroPic.png')" }}
//       />
   
//       <Card className=" absolute bottom-1/4 left-1/7 max-w-xl w-full backdrop-blur-xl bg-white/40 border border-white/50 shadow-[0_12px_40px_0_rgba(74,93,78,0.12)] rounded-3xl p-8 md:p-10">
      
//       {/* Card Content Area */}
//       <div className="flex flex-col gap-6">
        
//         {/* Card Heading */}
//         <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2d3a30] leading-snug">
//           Ready to Transform Your Fitness Journey?
//         </h2>
        
//         {/* Optional Description Text */}
//         <p className="text-sm md:text-base text-[#3d4940] font-medium leading-relaxed">
//           Join our global community of fitness enthusiasts and elite personal trainers. Choose your path below to get started immediately.
//         </p>

//         {/* Action Button Row */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-start">
//           {/* Primary Action Button */}
//           <Button
//             as={Link}
//             href="/classes"
//             size="lg"
//             className="bg-[#87A96B] hover:bg-[#76985a] text-white font-bold shadow-md shadow-[#87A96B]/20 transition-all duration-200 active:scale-95 px-8 h-12 rounded-xl flex-1 sm:flex-none"
//           >
//             Explore Classes
//           </Button>
          
//           {/* Secondary Glass Action Button */}
//           <Button
//             as={Link}
//             href="/register?role=trainer"
//             variant="bordered"
//             size="lg"
//             className="border-2 border-[#4A5D4E]/40 hover:border-[#4A5D4E] text-[#2d3a30] bg-white/30 hover:bg-white/50 font-bold transition-all duration-200 px-8 h-12 rounded-xl backdrop-blur-sm flex-1 sm:flex-none"
//           >
//             Join as Trainer
//           </Button>
//         </div>

//       </div>
//     </Card>
   
     
//     </section>
//     </div>
//   );
// }
'use client';

import React from 'react';
import { Button, Card, Link } from '@heroui/react';

export default function HeroSection() {
  return (
    <div className="w-full bg-[#EEF3E8] py-16 md:py-24 lg:py-28 px-4 antialiased">
      <section className="relative max-w-7xl mx-auto min-h-[75vh] lg:min-h-[80vh] rounded-[36px] overflow-hidden shadow-2xl flex items-center p-6 sm:p-12 md:p-16 lg:p-20">
        
        {/* --- PHOTOGRAPHIC BACKGROUND LAYER WITH INTEGRATED GRADIENT MASK --- */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-100 transition-transform duration-1000"
          style={{ backgroundImage: "url('/HeroPic.png')" }}
        />
        {/* Darkening/Color-balancing overlay gradient to make glass pop across all devices */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />

        {/* --- METALLIC SHIMMER LIGHT REFLECTION BLOB --- */}
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none z-1" />

        {/* --- PREMIUM GLASSMORPHIC CARD OVERLAY --- */}
        <Card className="relative z-10 max-w-xl w-full backdrop-blur-xl bg-white/30 border border-white/50 shadow-[0_24px_50px_-12px_rgba(47,58,47,0.18)] rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:bg-white/35">
          
          <div className="flex flex-col gap-6">
            
            {/* Context Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3A5311] shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#87A96B] animate-pulse"></span>
                FitSphere Platform
              </span>
            </div>

            {/* Card Heading */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1C261C] leading-[1.15]">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-[#3A5311] to-[#6B8E23] bg-clip-text text-transparent">
                Fitness Journey?
              </span>
            </h1>
            
            {/* Description Text */}
            <p className="text-base text-[#3D4A3D] font-medium leading-relaxed">
              Join a global ecosystem of health enthusiasts and certified personal trainers. Choose your path below to get started immediately.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-start">
              {/* Primary Action Button */}
              <Button
                as={Link}
                href="/classes"
                size="lg"
                className="bg-gradient-to-r from-[#87A96B] to-[#76985a] hover:opacity-95 text-white font-bold shadow-xl shadow-[#87A96B]/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] px-8 h-14 rounded-2xl flex-1 sm:flex-none"
              >
                Explore Classes
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              
              {/* Secondary Glass Action Button */}
              <Button
                as={Link}
                href="/register?role=trainer"
                variant="bordered"
                size="lg"
                className="border border-white/60 hover:border-white text-[#1C261C] bg-white/40 hover:bg-white/60 font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] px-8 h-14 rounded-2xl backdrop-blur-md flex-1 sm:flex-none"
              >
                Join as Trainer
              </Button>
            </div>

          </div>
        </Card>
        
      </section>
    </div>
  );
}