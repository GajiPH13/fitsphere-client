
// "use client";

// import React, { useEffect, useState } from "react";
// import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
// import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardLayout({ children }) {
//   const [mounted, setMounted] = useState(false);
//   const { data: session, isPending } = useSession();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted || isPending) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#eef4e8]">
//         <p className="animate-pulse text-sm font-medium text-[#2f3a2f]/60">
//           Loading workspace...
//         </p>
//       </div>
//     );
//   }

//   const role = session?.user?.role || "member";

//   return (
//     <>
//       <DashboardNavBar />

//       <div className="flex min-h-screen bg-linear-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4] font-[family:var(--font-plus-jakarta)]">
//         <aside className="hidden w-72 border-r border-[#c4d3b5]/40 bg-[#edf4e7]/40 p-4 pt-24 shadow-lg backdrop-blur-xl md:block">
//           <DashboardSideBar role={role} />
//         </aside>

//         <main className="relative min-h-screen flex-1 overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-5 py-10 pt-24 antialiased md:px-12 lg:px-20">
//           <div className="mb-4 md:hidden">
//             <DashboardSideBar role={role} mobileOnly />
//           </div>

//           {children}
//         </main>
//       </div>
//     </>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4e8] transition-colors duration-300 dark:bg-[#101510]">
        <p className="animate-pulse text-sm font-medium text-[#2f3a2f]/60 dark:text-[#EDF3E7]/70">
          Loading workspace...
        </p>
      </div>
    );
  }

  const role = session?.user?.role || "member";

  return (
    <>
      <DashboardNavBar />

      <div className="flex min-h-screen bg-gradient-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4] font-[family:var(--font-plus-jakarta)] text-[#2F3A2F] transition-colors duration-300 dark:from-[#101510] dark:via-[#121A12] dark:to-[#182018] dark:text-[#EDF3E7]">
        <aside className="hidden w-72 border-r border-[#c4d3b5]/40 bg-[#edf4e7]/40 p-4 pt-24 shadow-lg backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 md:block">
          <DashboardSideBar role={role} />
        </aside>

        <main className="relative min-h-screen flex-1 overflow-hidden bg-gradient-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-5 py-10 pt-24 antialiased transition-colors duration-300 dark:from-[#101510] dark:via-[#121A12] dark:to-[#182018] md:px-12 lg:px-20">
          <div className="mb-4 md:hidden">
            <DashboardSideBar role={role} mobileOnly />
          </div>

          {children}
        </main>
      </div>
    </>
  );
}