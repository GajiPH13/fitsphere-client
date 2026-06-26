// "use client";
// import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardLayout({ children }) {
//   const { data: session, isPending } = useSession();
  
//   // Safely grab the current user's role, defaulting to member if not ready
//   const role = session?.user?.role || "member";

//   // Optional: Prevent layout flicker while checking better-auth session
//   if (isPending) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#eef4e8]">
//         <p className="text-sm font-medium text-[#2f3a2f]/60 animate-pulse">Loading workspace...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-linear-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4]">
//       {/* Responsive Layout Sidebar Wrapper: 
//         Hidden on mobile devices (handled inside the component via Drawer trigger), 
//         Displays as a 1/5 width column on wide viewports (md:block).
//       */}
//       <div
//         className="
//           hidden md:block w-1/5 mt-20 p-4
//           bg-[#edf4e7]/40
//           backdrop-blur-xl
//           border border-[#c4d3b5]/40
//           shadow-lg
//         "
//       >
//         <DashboardSideBar role={role} />
//       </div>

//       {/* Main Panel Content Area */}
//       <main
//         className="
//           mt-20 flex-1  p-6
//           bg-white/20
//           backdrop-blur-lg
//           border border-[#c4d3b5]/30
//           shadow-md
//         "
//       >
//         {/* Render a quick floating menu toggle for small viewport devices */}
//         <div className="md:hidden mb-4">
//           <DashboardSideBar role={role} mobileOnly={true} />
//         </div>
//         {children}
//       </main>
//     </div>
//   );
// }
// "use client";


// import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
// import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardLayout({ children }) {
//   const { data: session, isPending } = useSession();

//   const role = session?.user?.role || "member";

//   if (isPending) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#eef4e8]">
//         <p className="animate-pulse text-sm font-medium text-[#2f3a2f]/60">
//           Loading workspace...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Dashboard Top Navbar */}
//       <DashboardNavBar />

//       <div className="flex min-h-screen bg-linear-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4]">
//         {/* Desktop Sidebar */}
//         <aside
//           className="
//             hidden
//             md:block
//             w-72
//             pt-24
//             p-4
//             bg-[#edf4e7]/40
//             backdrop-blur-xl
//             border-r
//             border-[#c4d3b5]/40
//             shadow-lg
//           "
//         >
//           <DashboardSideBar role={role} />
//         </aside>

//         {/* Main Content */}
//         <main
//           className="
//             flex-1
//             pt-24
//             p-6
//             bg-white/20
//             backdrop-blur-lg
//           "
//         >
//           {/* Mobile Sidebar Toggle */}
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
      <div className="flex min-h-screen items-center justify-center bg-[#eef4e8]">
        <p className="animate-pulse text-sm font-medium text-[#2f3a2f]/60">
          Loading workspace...
        </p>
      </div>
    );
  }

  const role = session?.user?.role || "member";

  return (
    <>
      <DashboardNavBar />

      <div className="flex min-h-screen bg-linear-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4]">
        <aside className="hidden w-72 border-r border-[#c4d3b5]/40 bg-[#edf4e7]/40 p-4 pt-24 shadow-lg backdrop-blur-xl md:block">
          <DashboardSideBar role={role} />
        </aside>

        <main className="flex-1 bg-white/20 p-6 pt-24 backdrop-blur-lg">
          <div className="mb-4 md:hidden">
            <DashboardSideBar role={role} mobileOnly />
          </div>

          {children}
        </main>
      </div>
    </>
  );
}