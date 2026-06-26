
import Link from "next/link";

const steps = [
  {
    title: "Explore fitness classes",
    description: "Discover a diverse array of premium workouts, yoga, and strength training tailored precisely to your schedule.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    )
  },
  {
    title: "Subscribe to a plan",
    description: "Unlock all premium features, routines, and tracking utilities with a frictionless subscription engine.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.296-1.593 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    title: "Book your favorite sessions",
    description: "Claim your slot instantly with our single-tap booking interface and sync it straight to your calendar.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )
  },
  {
    title: "Stay active with the community",
    description: "Share milestones, scale leaderboards, and progress continuously alongside thousands of peers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.998 5.998 0 00-4.161-5.723 5.998 5.998 0 00-3.678 0M12 7a3 3 0 100-6 3 3 0 000 6zm4.24 1.765a3.75 3.75 0 11-7.48 0 3.75 3.75 0 017.48 0z" />
      </svg>
    )
  },
];

export default function FitnessJourney() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E6EFD9] to-[#DDE5D0] px-6 py-28 md:px-16 lg:px-24 antialiased">
      
      {/* GLASMORPHIC BACKGROUND BLOB ORCHESTRATION */}
      <div className="absolute top-1/4 left-1/2 h-[450px] w-[450px] -translate-x-1/3 rounded-full bg-gradient-to-tr from-[#6B8E23]/25 to-[#A3B18A]/40 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-[#5A7A1E]/15 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center z-10">
        
        {/* LEFT BRAND HEADER CONTENT */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#6B8E23]"></span>
            Your Roadmap
          </span>

          <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-[#2F3A2F] md:text-5xl lg:text-5xl">
            Start Strong.<br />
            <span className="bg-linear-to-r from-[#6B8E23] to-[#3A5311] bg-clip-text text-transparent">Stay Consistent.</span><br />
            Grow Better.
          </h2>

          <p className="max-w-xl text-lg font-medium leading-relaxed text-[#5D6B57]/90">
            Whether you're just beginning your fitness journey or looking to
            reach the next level, FitSphere provides expert trainers,
            personalized classes, and a supportive community to help you stay
            motivated every day.
          </p>

          <div className="pt-4">
            <Link
              href="/allclasses"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#6B8E23] to-[#5A7A1E] px-8 py-4.5 font-bold text-white shadow-xl shadow-[#6B8E23]/20 transition-all duration-300 hover:opacity-95 hover:shadow-2xl hover:shadow-[#6B8E23]/30 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Explore Classes
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* RIGHT TIMELINE GLASS CARDS */}
        <div className="relative space-y-4">
          {/* Subtle connecting tracking line */}
          <div className="absolute left-11 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#6B8E23]/30 via-[#6B8E23]/10 to-transparent hidden sm:block" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col sm:flex-row items-start gap-5 rounded-[32px] border border-white/60 bg-white/35 p-6 shadow-xl shadow-slate-900/[0.02] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 hover:shadow-2xl hover:shadow-[#2F3A2F]/5"
            >
              {/* Floating index ring */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-[#2F3A2F] shadow-sm group-hover:bg-[#6B8E23] group-hover:text-white transition-colors duration-300 relative z-10">
                0{index + 1}
              </div>

              {/* Core Content Layout */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#6B8E23] uppercase tracking-wider bg-[#6B8E23]/10 px-2 py-0.5 rounded-md">
                    Phase {index + 1}
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-[#2F3A2F]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm font-medium leading-relaxed text-[#5D6B57]/90 pt-1">
                  {step.description}
                </p>
              </div>

              {/* Modern Graphic Micro-badge */}
              <div className="absolute top-6 right-6 text-[#5D6B57]/30 group-hover:text-[#6B8E23]/80 transition-colors duration-300 hidden sm:block">
                {step.icon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}