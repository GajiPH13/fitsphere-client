import {
  LayoutSideContentLeft,
  House,
  Person,
  FolderOpenFill,
  BookOpen,
  Persons,
  ListCheck,
  Calculator,
  Comment,
  SquareListUl,
  Heart,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSideBar({ role = "member", mobileOnly = false }) {
  const pathname = usePathname();

  const navItemsByRole = {
    member: [
      { icon: House, href: "/dashboard/member", label: "Dashboard" },
      {
        icon: Calculator,
        href: "/dashboard/member/my-bookings",
        label: "My Bookings",
      },
      {
        icon: Heart,
        href: "/dashboard/member/favorite-classes",
        label: "Favorite Classes",
      },
      {
        icon: ListCheck,
        href: "/dashboard/member/subscriptions",
        label: "Subscriptions",
      },
      {
        icon: Person,
        href: "/dashboard/member/apply-trainer",
        label: "Apply as Trainer",
      },
    ],
    trainer: [
      { icon: House, href: "/dashboard/trainer", label: "Dashboard" },
      {
        icon: SquareListUl,
        href: "/dashboard/trainer/classes",
        label: "My Classes",
      },
      {
        icon: Persons,
        href: "/dashboard/trainer/attendees",
        label: "Attendees",
      },
      { icon: Comment, href: "/dashboard/trainer/forum", label: "Forum" },
    ],
    admin: [
      { icon: House, href: "/dashboard/admin", label: "Dashboard" },
      { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
      {
        icon: FolderOpenFill,
        href: "/dashboard/admin/trainer-applications",
        label: "Trainer Requests",
      },
      { icon: SquareListUl, href: "/dashboard/admin/classes", label: "Classes" },
      { icon: BookOpen, href: "/dashboard/admin/forum", label: "Forum" },
    ],
  };

  const navItems = navItemsByRole[role] || navItemsByRole.member;

  const navContent = (
    <nav className="flex w-full flex-col gap-1">
      <div className="mb-4 rounded-xl border border-[#6B8E23]/20 bg-[#6B8E23]/10 px-3 py-2 text-center dark:border-zinc-700 dark:bg-zinc-950">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2f3a2f] dark:text-zinc-50">
          {role} Workspace
        </span>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              isActive
                ? "border border-[#6B8E23]/30 bg-[#6B8E23] text-black shadow-md shadow-[#6B8E23]/10 dark:border-zinc-600 dark:bg-[#6B8E23] dark:text-white"
                : "text-[#4b5a4b] hover:bg-[#6B8E23]/5 hover:text-[#2f3a2f] dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            }`}
          >
            <Icon
              className={`size-5 ${
                isActive
                  ? "text-white"
                  : "text-[#5D6B57] dark:text-zinc-400"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  if (mobileOnly) {
    return (
      <Drawer>
        <Button
          className="h-11 w-full justify-start rounded-xl border border-[#c4d3b5]/40 bg-white/60 text-[#2f3a2f] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 md:hidden"
          variant="secondary"
        >
          <LayoutSideContentLeft className="size-5 text-[#5D6B57] dark:text-zinc-400" />
          Workspace Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-[#f4f6ee] text-[#2f3a2f] dark:bg-zinc-900 dark:text-zinc-50">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="font-bold text-[#2f3a2f] dark:text-zinc-50">
                  FitSphere Menu
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="pt-2">{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    );
  }

  return <div className="w-full">{navContent}</div>;
}