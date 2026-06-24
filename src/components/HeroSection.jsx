// 'use client';

// import React from 'react';
// import { Button, Link } from '@heroui/react';

// export default function HeroSection() {
//   return (
//     <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f4f7f4] via-[#ecf1ec] to-[#e2eae2] py-20 px-4">
      
//       {/* --- AMBIENT BACKDROP LAYER --- */}
//       <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-[#87A96B]/20 to-[#aecea3]/15 blur-3xl pointer-events-none" />
//       <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#4A5D4E]/10 to-[#87A96B]/15 blur-3xl pointer-events-none" />

//       {/* --- MAIN FULL-WIDTH CONTAINER --- */}
//       <div className="relative z-10 max-w-5xl w-full text-center sm:text-left backdrop-blur-xl bg-white/30 border border-white/40 shadow-[0_8px_32px_0_rgba(74,93,78,0.06)] rounded-3xl p-8 md:p-16">
        
//         {/* Badge indicator */}
//         <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#4A5D4E]/10 text-[#4A5D4E] mb-6">
//           ✨ Your All-In-One Fitness Ecosystem
//         </span>

//         {/* Main Headline */}
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2d3a30] leading-[1.15] mb-6 max-w-3xl">
//           Empower Your Journey. <br />
//           <span className="bg-gradient-to-r from-[#4A5D4E] to-[#6b8470] bg-clip-text text-transparent">
//             Elevate Your Fitness.
//           </span>
//         </h1>

//         {/* Subheadline */}
//         <p className="text-base md:text-lg text-[#556459] font-medium leading-relaxed mb-8 max-w-2xl">
//           Discover elite fitness classes, book seamless sessions, and track your metrics. A unified space where enthusiasts thrive, trainers scale their businesses, and communities connect safely.
//         </p>

//         {/* Call To Action Buttons (HeroUI v3.1.0) */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-start">
//           <Button
//             as={Link}
//             href="/classes"
//             size="lg"
//             className="bg-[#87A96B] hover:bg-[#76985a] text-white font-bold shadow-lg shadow-[#87A96B]/20 transition-transform active:scale-95 px-10 h-14 rounded-xl"
//           >
//             Explore Classes
//           </Button>
          
//           <Button
//             as={Link}
//             href="/register?role=trainer"
//             variant="bordered"
//             size="lg"
//             className="border-2 border-[#4A5D4E]/30 hover:border-[#4A5D4E] text-[#4A5D4E] bg-white/20 hover:bg-white/40 font-bold transition-colors px-10 h-14 rounded-xl"
//           >
//             Join as Trainer
//           </Button>
//         </div>

//       </div>
//     </section>
//   );
// }
'use client';

import React from 'react';
import { Button, Card, Link } from '@heroui/react';

export default function HeroSection() {
  return (
    <div className="w-full bg-[#EEF3E8] pt-30 pb-20  px-4">
        <section className="relative  max-w-7xl mx-auto min-h-[75vh]  overflow-hidden ">
      
      {/* --- REAL IMAGE BACKGROUND LAYER --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat rounded-3xl "
        style={{ backgroundImage: "url('/HeroPic.png')" }}
      />
   
      <Card className=" absolute bottom-1/4 left-1/7 max-w-xl w-full backdrop-blur-xl bg-white/40 border border-white/50 shadow-[0_12px_40px_0_rgba(74,93,78,0.12)] rounded-3xl p-8 md:p-10">
      
      {/* Card Content Area */}
      <div className="flex flex-col gap-6">
        
        {/* Card Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2d3a30] leading-snug">
          Ready to Transform Your Fitness Journey?
        </h2>
        
        {/* Optional Description Text */}
        <p className="text-sm md:text-base text-[#3d4940] font-medium leading-relaxed">
          Join our global community of fitness enthusiasts and elite personal trainers. Choose your path below to get started immediately.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-start">
          {/* Primary Action Button */}
          <Button
            as={Link}
            href="/classes"
            size="lg"
            className="bg-[#87A96B] hover:bg-[#76985a] text-white font-bold shadow-md shadow-[#87A96B]/20 transition-all duration-200 active:scale-95 px-8 h-12 rounded-xl flex-1 sm:flex-none"
          >
            Explore Classes
          </Button>
          
          {/* Secondary Glass Action Button */}
          <Button
            as={Link}
            href="/register?role=trainer"
            variant="bordered"
            size="lg"
            className="border-2 border-[#4A5D4E]/40 hover:border-[#4A5D4E] text-[#2d3a30] bg-white/30 hover:bg-white/50 font-bold transition-all duration-200 px-8 h-12 rounded-xl backdrop-blur-sm flex-1 sm:flex-none"
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