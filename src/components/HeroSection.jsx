
'use client';

import React from 'react';
import { Button, Card, Link } from '@heroui/react';
import {ArrowRight} from '@gravity-ui/icons';
import { useSession } from '@/lib/auth-client';

export default function HeroSection() {
  const { data: session } = useSession();
  const trainerLink = session?.user?.role === "member"
    ? "/dashboard/member/apply-trainer"
    : "/priceing";
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
            <h1 className="text-3xl font-(--font-plus-jakarta) font-weight-semibold md:text-4xl  tracking-tight text-[#1C261C] leading-[1.15]">
              Ready to Transform Your{" "}
              <span className=" bg-linear-to-r from-[#3A5311] to-[#6B8E23] bg-clip-text text-transparent">
                Fitness Journey?
              </span>
            </h1>
            
            {/* Description Text */}
            <p className=" text-base font-size-2xl text-[#3D4A3D] font-(--font-plus-jakarta) font-weight-medium leading-relaxed">
              Join a global ecosystem of health enthusiasts and certified personal trainers. Choose your path below to get started immediately.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row">
  {/* Primary Action Button */}
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
    Explore Classes
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>

  {/* Secondary Action Button */}
  <Link
    href={trainerLink}
    className="
      inline-flex
      h-14
      items-center
      justify-center
      rounded-full
      border
      border-white/60
      bg-white/40
      px-8
      font-(--font-plus-jakarta)
      font-weight-bold
      text-[#1C261C]
      shadow-sm
      backdrop-blur-md
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:border-white
      hover:bg-white/60
      active:scale-[0.98]
    "
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