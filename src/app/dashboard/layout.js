"use client";
import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  
  // Safely grab the current user's role, defaulting to member if not ready
  const role = session?.user?.role || "member";

  // Optional: Prevent layout flicker while checking better-auth session
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4e8]">
        <p className="text-sm font-medium text-[#2f3a2f]/60 animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#eef4e8] via-[#e8f0e2] to-[#dde8d4]">
      {/* Responsive Layout Sidebar Wrapper: 
        Hidden on mobile devices (handled inside the component via Drawer trigger), 
        Displays as a 1/5 width column on wide viewports (md:block).
      */}
      <div
        className="
          hidden md:block w-1/5 mt-20 p-4
          bg-[#edf4e7]/40
          backdrop-blur-xl
          border border-[#c4d3b5]/40
          shadow-lg
        "
      >
        <DashboardSideBar role={role} />
      </div>

      {/* Main Panel Content Area */}
      <main
        className="
          mt-20 flex-1  p-6
          bg-white/20
          backdrop-blur-lg
          border border-[#c4d3b5]/30
          shadow-md
        "
      >
        {/* Render a quick floating menu toggle for small viewport devices */}
        <div className="md:hidden mb-4">
          <DashboardSideBar role={role} mobileOnly={true} />
        </div>
        {children}
      </main>
    </div>
  );
}