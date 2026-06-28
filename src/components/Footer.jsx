// "use client";

// import React from "react";
// import { Link } from "@heroui/react";
// import { usePathname } from "next/navigation";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   // Use usePathname to determine the current path and conditionally render NavBar
//   const pathName = usePathname();
//   if (pathName.startsWith("/dashboard")) {
//     return null; // Don't render NavBar on dashboard pages
//   }
//   return (
//     <footer className="relative w-full bg-[#f4f7f4] border-t border-[#4A5D4E]/10 pt-16 pb-8 px-4 overflow-hidden">
//       {/* Subtle Ambient Glow behind the footer content */}
//       <div className="absolute bottom-0 left-1/4 w-96 h-48 rounded-full bg-[#87A96B]/5 blur-3xl pointer-events-none" />

//       <div className="max-w-6xl w-full mx-auto relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#4A5D4E]/10">
//           {/* COLUMN 1: BRAND LOGO, OVERVIEW, & SOCIAL ICONS */}
//           <div className="lg:col-span-4 flex flex-col gap-5">
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/"
//                 className="flex items-center gap-2.5 font-bold text-lg text-[#2f3a2f] cursor-pointer"
//               >
//                 <svg
//                   className="w-10 h-10"
//                   viewBox="0 0 200 200"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="85"
//                     stroke="#2F3A2F"
//                     strokeWidth="10"
//                     strokeDasharray="440 100"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M50 95 C70 75, 130 75, 150 95 C130 82, 70 82, 50 95 Z"
//                     fill="#A3B18A"
//                   />
//                   <circle cx="100" cy="65" r="12" fill="#2F3A2F" />
//                   <path
//                     d="M100 82 C106 95, 114 115, 125 145 C112 138, 103 125, 100 110 C97 125, 88 138, 75 145 C86 115, 94 95, 100 82 Z"
//                     fill="#2F3A2F"
//                   />
//                   <circle cx="100" cy="102" r="7" fill="#A3B18A" />
//                 </svg>
//                 <span className="tracking-tight">FitSphere</span>
//               </Link>
              
//             </div>
//             <p className="text-sm text-[#556459] leading-relaxed max-w-sm">
//               A premium, all-in-one fitness ecosystem connecting passionate
//               enthusiasts with certified gym trainers in a secure, moderated
//               space.
//             </p>

//             {/* --- SOCIAL MEDIA ICONS LAYOUT --- */}
//             <div className="flex items-center gap-3 mt-2">
//               {/* Facebook */}
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 rounded-full bg-white border border-[#4A5D4E]/10 flex items-center justify-center text-[#556459]  hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all duration-200 shadow-sm"
//                 aria-label="Facebook"
//               >
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                   <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
//                 </svg>
//               </a>

//               {/* Instagram */}
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 rounded-full bg-white border border-[#4A5D4E]/10 flex items-center justify-center text-[#556459]  hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all duration-200 shadow-sm"
//                 aria-label="Instagram"
//               >
//                 <svg
//                   className="w-4 h-4 stroke-current fill-none stroke-2"
//                   viewBox="0 0 24 24"
//                 >
//                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                 </svg>
//               </a>

//               {/* X (formerly Twitter) */}
//               <a
//                 href="https://x.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 rounded-full bg-white border border-[#4A5D4E]/10 flex items-center justify-center text-[#556459]  hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all duration-200 shadow-sm"
//                 aria-label="X (Twitter)"
//               >
//                 <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
//                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//                 </svg>
//               </a>

//               {/* YouTube */}
//               <a
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 rounded-full bg-white border border-[#4A5D4E]/10 flex items-center justify-center text-[#556459]  hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all duration-200 shadow-sm"
//                 aria-label="YouTube"
//               >
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                   <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* COLUMN 2: FOR ENTHUSIASTS (2 Columns) */}
//           <div className="lg:col-span-2 flex flex-col gap-3">
//             <h4 className="text-sm font-bold text-[#2d3a30] uppercase tracking-wider mb-1">
//               Enthusiasts
//             </h4>
//             <Link
//               href="/classes"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Find Classes
//             </Link>
//             <Link
//               href="/trainers"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Expert Trainers
//             </Link>
//             <Link
//               href="/dashboard/user"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Fitness Tracker
//             </Link>
//           </div>

//           {/* COLUMN 3: FOR TRAINERS (2 Columns) */}
//           <div className="lg:col-span-2 flex flex-col gap-3">
//             <h4 className="text-sm font-bold text-[#2d3a30] uppercase tracking-wider mb-1">
//               Trainers
//             </h4>
//             <Link
//               href="/register?role=trainer"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               List a Class
//             </Link>
//             <Link
//               href="/dashboard/trainer"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Manage Attendees
//             </Link>
//             <Link
//               href="/trainer-resources"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Grow Your Business
//             </Link>
//           </div>

//           {/* COLUMN 4: COMMUNITY & SAFETY (2 Columns) */}
//           <div className="lg:col-span-2 flex flex-col gap-3">
//             <h4 className="text-sm font-bold text-[#2d3a30] uppercase tracking-wider mb-1">
//               Community
//             </h4>
//             <Link
//               href="/forum"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Discussions
//             </Link>
//             <Link
//               href="/guidelines"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Community Rules
//             </Link>
//             <Link
//               href="/safety"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Safety & Trust
//             </Link>
//           </div>

//           {/* COLUMN 5: LEGAL / ADMIN OVERVIEW (2 Columns) */}
//           <div className="lg:col-span-2 flex flex-col gap-3">
//             <h4 className="text-sm font-bold text-[#2d3a30] uppercase tracking-wider mb-1">
//               Company
//             </h4>
//             <Link
//               href="/about"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               About Us
//             </Link>
//             <Link
//               href="/privacy"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               href="/terms"
//               className="text-sm text-[#556459] hover:text-[#4A5D4E] transition-colors w-fit"
//             >
//               Terms of Service
//             </Link>
//           </div>
//         </div>

//         {/* BOTTOM METRICS BAR / COPYRIGHT */}
//         <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-[#728476] font-medium">
//             &copy; {currentYear} FitSphere. All rights reserved. Built safely
//             via Express, MongoDB, & Better Auth.
//           </p>

//           <div className="flex items-center gap-4 text-xs font-semibold text-[#556459]">
//             <span className="w-2 h-2 rounded-full bg-[#87A96B] animate-pulse" />
//             <span>Platform Status: Fully Operational</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const currentYear = new Date().getFullYear();

  // হাইড্রেশন এবং ফ্লিকারিং সমস্যা এড়ানোর জন্য লাইফসাইকেল গার্ড
  useEffect(() => {
    setMounted(true);
  }, []);

  // ড্যাশবোর্ডের পাথে ফুটার হাইড রাখার লজিক
  if (pathName?.startsWith("/dashboard")) {
    return null;
  }

  if (!mounted) {
    return (
      <footer className="w-full bg-[#f4f7f4] dark:bg-zinc-950 border-t border-[#4A5D4E]/10 dark:border-zinc-800/50 py-16 transition-colors duration-300" />
    );
  }

  return (
    <footer className="relative w-full bg-[#f4f7f4] dark:bg-zinc-950 border-t border-[#4A5D4E]/10 dark:border-zinc-800/50 pt-16 pb-8 px-4 overflow-hidden transition-colors duration-300 antialiased">
      {/* Subtle Ambient Glow behind the footer content */}
      <div className="absolute bottom-0 left-1/4 w-96 h-48 rounded-full bg-[#87A96B]/5 dark:bg-[#87A96B]/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#4A5D4E]/10 dark:border-zinc-800/60">
          
          {/* COLUMN 1: BRAND LOGO, OVERVIEW, & SOCIAL ICONS */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-bold text-lg text-[#2f3a2f] dark:text-zinc-100 cursor-pointer"
              >
                <svg
                  className="w-10 h-10 text-[#2F3A2F] dark:text-zinc-200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray="440 100"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 95 C70 75, 130 75, 150 95 C130 82, 70 82, 50 95 Z"
                    fill="#A3B18A"
                  />
                  <circle cx="100" cy="65" r="12" fill="currentColor" />
                  <path
                    d="M100 82 C106 95, 114 115, 125 145 C112 138, 103 125, 100 110 C97 125, 88 138, 75 145 C86 115, 94 95, 100 82 Z"
                    fill="currentColor"
                  />
                  <circle cx="100" cy="102" r="7" fill="#A3B18A" />
                </svg>
                <span className="tracking-tight font-extrabold">FitSphere</span>
              </Link>
            </div>
            <p className="text-sm text-[#556459] dark:text-zinc-400 leading-relaxed max-w-sm">
              A premium, all-in-one fitness ecosystem connecting passionate
              enthusiasts with certified gym trainers in a secure, moderated
              space.
            </p>

            {/* --- SOCIAL MEDIA ICONS LAYOUT --- */}
            <div className="flex items-center gap-3 mt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-[#4A5D4E]/10 dark:border-zinc-800 flex items-center justify-center text-[#556459] dark:text-zinc-400 hover:bg-[#4A5D4E] dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950 transition-all duration-200 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-[#4A5D4E]/10 dark:border-zinc-800 flex items-center justify-center text-[#556459] dark:text-zinc-400 hover:bg-[#4A5D4E] dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950 transition-all duration-200 shadow-sm"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 stroke-current fill-none stroke-2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-[#4A5D4E]/10 dark:border-zinc-800 flex items-center justify-center text-[#556459] dark:text-zinc-400 hover:bg-[#4A5D4E] dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950 transition-all duration-200 shadow-sm"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-[#4A5D4E]/10 dark:border-zinc-800 flex items-center justify-center text-[#556459] dark:text-zinc-400 hover:bg-[#4A5D4E] dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-950 transition-all duration-200 shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: FOR ENTHUSIASTS */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2d3a30] dark:text-zinc-200 uppercase tracking-wider mb-1">
              Enthusiasts
            </h4>
            <Link
              href="/classes"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Find Classes
            </Link>
            <Link
              href="/trainers"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Expert Trainers
            </Link>
            <Link
              href="/dashboard/user"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Fitness Tracker
            </Link>
          </div>

          {/* COLUMN 3: FOR TRAINERS */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2d3a30] dark:text-zinc-200 uppercase tracking-wider mb-1">
              Trainers
            </h4>
            <Link
              href="/register?role=trainer"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              List a Class
            </Link>
            <Link
              href="/dashboard/trainer"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Manage Attendees
            </Link>
            <Link
              href="/trainer-resources"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Grow Your Business
            </Link>
          </div>

          {/* COLUMN 4: COMMUNITY & SAFETY */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2d3a30] dark:text-zinc-200 uppercase tracking-wider mb-1">
              Community
            </h4>
            <Link
              href="/forum"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Discussions
            </Link>
            <Link
              href="/guidelines"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Community Rules
            </Link>
            <Link
              href="/safety"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Safety & Trust
            </Link>
          </div>

          {/* COLUMN 5: LEGAL / ADMIN OVERVIEW */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#2d3a30] dark:text-zinc-200 uppercase tracking-wider mb-1">
              Company
            </h4>
            <Link
              href="/about"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#556459] dark:text-zinc-400 hover:text-[#4A5D4E] dark:hover:text-zinc-200 transition-colors w-fit"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* BOTTOM METRICS BAR / COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#728476] dark:text-zinc-500 font-medium text-center sm:text-left">
            &copy; {currentYear} FitSphere. All rights reserved. Built safely
            via Express, MongoDB, & Better Auth.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#556459] dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#87A96B] animate-pulse" />
            <span>Platform Status: Fully Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}