
"use client";

import Link from "next/link";
import { ArrowLeft, LayoutList } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function UnderConstructionPage() {
    const { data: session } = authClient.useSession();

const dashboardLink = session?.user
  ? `/dashboard/${session.user.role}`
  : "/";

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EDF3E7] via-[#E6EFD9] to-[#DDE5D0] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-6 overflow-hidden antialiased transition-colors duration-300">
      
      {/* BACKGROUND ORCHESTRATION / GLASSMORPHIC BLOBS */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-[#6B8E23]/20 to-[#A3B18A]/30 dark:from-[#87A96B]/5 dark:to-[#6B8E23]/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#5A7A1E]/15 dark:bg-zinc-800/5 blur-[120px] pointer-events-none" />

      <section className="mt-50 relative w-full max-w-xl mx-auto rounded-[38px] border border-white/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/20 p-8 md:p-12 text-center shadow-2xl shadow-slate-900/[0.03] dark:shadow-black/40 backdrop-blur-2xl z-10">
        
        {/* ANIMATED CONCEPT ICON */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 mx-auto h-24 w-24 rounded-full bg-[#6B8E23]/10 dark:bg-[#87A96B]/10 blur-md animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 shadow-md">
            <svg 
              className="h-12 w-12 text-[#6B8E23] dark:text-[#87A96B] animate-spin" 
              style={{ animationDuration: '8s' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767a1.123 1.123 0 00-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 00.417 1.03l1.003.767c.379.29.507.806.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456a1.125 1.125 0 00-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.646-.87a6.538 6.538 0 01-.218-.127a1.125 1.125 0 00-1.074-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.767a1.122 1.122 0 00.417-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 00-.417-1.03l-1.004-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.218-.128.332-.183.582-.495.645-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* TYPOGRAPHY WITH LINEAR GRADIENT */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-4xl">
          Under{" "}
          <span className="bg-linear-to-r from-[#6B8E23] to-[#3A5311] dark:from-[#87A96B] dark:to-[#6B8E23] bg-clip-text text-transparent">
            Construction
          </span>
        </h1>

        <p className="mt-4 text-base font-medium leading-relaxed text-[#5D6B57]/90 dark:text-zinc-400 max-w-md mx-auto">
          We are currently engineering this ecosystem module. This section of FitSphere will be live shortly.
        </p>

        {/* MODERN ACTION BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] px-6 text-sm font-bold text-white dark:text-zinc-950 shadow-lg shadow-[#6B8E23]/20 dark:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <Link
            href={dashboardLink}
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#d7dfc6] dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 px-6 text-sm font-bold text-[#2F3A2F] dark:text-zinc-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-zinc-900/80 active:scale-[0.98]"
          >
            <LayoutList className="h-4 w-4 text-[#6B8E23] dark:text-[#87A96B]" />
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}