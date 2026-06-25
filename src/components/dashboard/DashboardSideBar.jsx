import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Person,
  ChartColumn,
  BookOpen,
  Dumbbell,
  Persons,
  Shield,
  LayoutList,
  SquareList,
  ClipboardCheck,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSideBar({ role = "member", mobileOnly = false }) {
  const pathname = usePathname();

  const navItemsByRole = {
    member: [
      { icon: House, href: "/dashboard/member", label: "Dashboard" },
      { icon: Gear, href: "/dashboard/member/classes", label: "Classes" },
      { icon: Bell, href: "/dashboard/member/bookings", label: "My Bookings" },
      { icon: ChartColumn, href: "/dashboard/member/progress", label: "Progress" },
      { icon: BookOpen, href: "/dashboard/member/forum", label: "Community" },
      { icon: Person, href: "/dashboard/member/profile", label: "Profile" },
      { icon: Gear, href: "/dashboard/member/settings", label: "Settings" },
    ],
    trainer: [
      { icon: House, href: "/dashboard/trainer", label: "Dashboard" },
      { icon: Gear, href: "/dashboard/trainer/classes", label: "My Classes" },
      { icon: Persons, href: "/dashboard/trainer/attendees", label: "Attendees" },
      { icon: ChartColumn, href: "/dashboard/trainer/analytics", label: "Analytics" },
      { icon: BookOpen, href: "/dashboard/trainer/forum/create", label: "Forum" },
      { icon: Person, href: "/dashboard/trainer/profile", label: "Profile" },
      { icon: Gear, href: "/dashboard/trainer/settings", label: "Settings" },
    ],
    admin: [
      { icon: House, href: "/dashboard/admin", label: "Dashboard" },
      { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
      { icon: LayoutList, href: "/dashboard/admin/trainers", label: "Trainer Requests" },
      { icon: LayoutList, href: "/dashboard/admin/classes", label: "Classes" },
      { icon: BookOpen, href: "/dashboard/admin/forum/create", label: "Forum" },
      { icon: Shield, href: "/dashboard/admin/reports", label: "Reports" },
      { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ],
  };

  // Fallback gracefully to member links list if the role does not exist
  const navItems = navItemsByRole[role] || navItemsByRole.member;

  const navContent = (
    <nav className="flex flex-col gap-1 w-full">
      {/* Dynamic Header Badge inside navigation */}
      <div className="px-3 py-2 mb-4 rounded-xl bg-[#6B8E23]/10 border border-[#6B8E23]/20 text-center">
        <span className="text-xs font-bold text-[#2f3a2f] uppercase tracking-wider">
          {role} Workspace
        </span>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              isActive
                ? "bg-[#6B8E23] text-[#4b5a4b] shadow-md shadow-[#6B8E23]/10"
                : "text-[#4b5a4b] hover:bg-[#6B8E23]/5 hover:text-[#2f3a2f]"
            }`}
          >
            <item.icon className={`size-5 ${isActive ? "text-[#4b5a4b]" : "text-[#5D6B57]"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  // If this rendering pass is specifically designated for the floating mobile menu layout
  if (mobileOnly) {
    return (
      <Drawer>
        <Button className="md:hidden w-full justify-start h-11 rounded-xl bg-white/60 border border-[#c4d3b5]/40 text-[#2f3a2f]" variant="secondary">
          <LayoutSideContentLeft className="size-5 text-[#5D6B57]" />
          Workspace Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-[#2f3a2f] font-bold">FitSphere Menu</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="pt-2">{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    );
  }

  // Desktop viewport fallback output structure
  return <div className="w-full">{navContent}</div>;
}