
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  PersonFill,
  ArrowRightToSquare,
  Bars,
  Xmark,
  Magnifier,
  BellDot,
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardNavBar() {
  const { data: session, isPending: loading } = authClient.useSession();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [readNotifications, setReadNotifications] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  const user = session?.user;
  const userRole = user?.role;
  const dashboardHref = `/dashboard/${userRole || "member"}`;

  const notifications = useMemo(() => {
    const data = {
      admin: [
        {
          id: "admin-trainer-applications",
          text: "New trainer applications",
          href: "/dashboard/admin/trainer-applications",
        },
        {
          id: "admin-pending-classes",
          text: "New classes waiting for approval",
          href: "/dashboard/admin/classes",
        },
        {
          id: "admin-forum-posts",
          text: "New forum posts published",
          href: "/dashboard/admin/forum",
        },
      ],
      trainer: [
        {
          id: "trainer-attendees",
          text: "New attendee bookings",
          href: "/dashboard/trainer/attendees",
        },
        {
          id: "trainer-classes",
          text: "Class approval status updated",
          href: "/dashboard/trainer/classes",
        },
        {
          id: "trainer-forum",
          text: "New forum engagement",
          href: "/dashboard/trainer/forum",
        },
      ],
      member: [
        {
          id: "member-classes",
          text: "New classes available",
          href: "/allclasses",
        },
        {
          id: "member-forum",
          text: "New forum posts",
          href: "/forum",
        },
        {
          id: "member-subscription",
          text: "Subscription updates",
          href: "/dashboard/member/subscriptions",
        },
      ],
    };

    return data[userRole] || [];
  }, [userRole]);

  const storageKey = user?.id
    ? `fitsphere_notifications_read_${user.id}_${userRole}`
    : null;

  useEffect(() => {
    if (!storageKey) return;

    const saved = localStorage.getItem(storageKey);
    setReadNotifications(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const unreadNotifications = notifications.filter(
    (item) => !readNotifications.includes(item.id)
  );

  const notificationCount = unreadNotifications.length;

  const markNotificationAsRead = (notificationId) => {
    if (!storageKey) return;

    const updated = Array.from(new Set([...readNotifications, notificationId]));

    setReadNotifications(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setIsOpen(false);
  };

  useEffect(() => {
    const matched = notifications.find((item) => item.href === pathname);

    if (matched && !readNotifications.includes(matched.id)) {
      markNotificationAsRead(matched.id);
    }
  }, [pathname, notifications, readNotifications]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(
      `${dashboardHref}?search=${encodeURIComponent(searchQuery.trim())}`
    );

    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsOpen(false);
      router.replace("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <>
      <header
        className={
          "fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 border-b border-[#d7dfc6]/60 px-4 transition-all duration-300 md:px-20 " +
          (scrolled
            ? "bg-[#f4f6ee]/90 py-1 shadow-md"
            : "bg-[#f4f6ee]/70 py-2")
        }
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-2 md:px-6">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Dashboard Drawer"
            className="flex rounded-lg p-2 text-[#2f3a2f] transition hover:bg-black/5 md:hidden"
          >
            <Bars size={20} />
          </button>

          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2.5 text-lg font-bold text-[#2f3a2f]"
          >
            <svg
              className="h-10 w-10"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#2F3A2F"
                strokeWidth="10"
                strokeDasharray="440 100"
                strokeLinecap="round"
              />
              <path
                d="M50 95 C70 75, 130 75, 150 95 C130 82, 70 82, 50 95 Z"
                fill="#A3B18A"
              />
              <circle cx="100" cy="65" r="12" fill="#2F3A2F" />
              <path
                d="M100 82 C106 95, 114 115, 125 145 C112 138, 103 125, 100 110 C97 125, 88 138, 75 145 C86 115, 94 95, 100 82 Z"
                fill="#2F3A2F"
              />
              <circle cx="100" cy="102" r="7" fill="#A3B18A" />
            </svg>

            <span className="tracking-tight">FitSphere</span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="mx-8 hidden flex-1 justify-center md:flex"
          >
            <div className="relative w-full max-w-xl">
              <Magnifier
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D6B57]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dashboard..."
                className="h-11 w-full rounded-full border border-[#d7dfc6]/70 bg-white/60 pl-12 pr-5 text-sm font-medium text-[#2f3a2f] outline-none backdrop-blur-xl transition focus:border-[#6B8E23] focus:bg-white/80 focus:ring-2 focus:ring-[#6B8E23]/20"
              />
            </div>
          </form>

          <div className="hidden items-center gap-3 md:flex">
            {!loading && session ? (
              <>
                <NotificationBell
                  notificationCount={notificationCount}
                  notifications={notifications}
                  readNotifications={readNotifications}
                  onRead={markNotificationAsRead}
                />

                <div className="flex items-center gap-2 border-r border-[#d7dfc6]/60 pr-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#6B8E23] bg-white">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[#2f3a2f]">
                        <PersonFill size={14} />
                      </div>
                    )}
                  </div>

                  <div className="flex max-w-[130px] flex-col">
                    <span className="truncate text-xs font-semibold text-[#2f3a2f]">
                      {user?.name}
                    </span>
                    <span className="truncate text-[10px] font-medium uppercase text-[#6B8E23]">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-full border border-red-200 bg-white/50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-[#2f3a2f] shadow-sm transition hover:bg-black/5 active:scale-95"
                >
                  <PersonFill size={15} />
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 rounded-full bg-[#6B8E23] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#5A7A1E] active:scale-95"
                >
                  <ArrowRightToSquare size={14} />
                  Join Now
                </Link>
              </>
            )}
          </div>

          <div className="h-8 w-8 md:hidden" />
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2f3a2f]/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute bottom-0 left-0 top-0 flex w-72 max-w-[80vw] flex-col justify-between border-r border-white/40 bg-[#f4f6ee] p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-[#d7dfc6]/60 pb-4">
              <span className="font-bold text-[#2f3a2f]">FitSphere</span>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-[#4b5a4b] hover:bg-black/5"
                aria-label="Close Dashboard Drawer"
              >
                <Xmark size={18} />
              </button>
            </div>

            {!loading && session && (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#d7dfc6]/40 bg-white/50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#6B8E23]">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="User Profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[#2f3a2f]">
                          <PersonFill size={16} />
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-bold text-[#2f3a2f]">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs text-[#5D6B57]">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <NotificationBell
                    notificationCount={notificationCount}
                    notifications={notifications}
                    readNotifications={readNotifications}
                    onRead={markNotificationAsRead}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700 transition active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            )}

            <form onSubmit={handleSearch} className="mb-5">
              <div className="relative">
                <Magnifier
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D6B57]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dashboard..."
                  className="h-11 w-full rounded-xl border border-[#d7dfc6]/70 bg-white/70 pl-11 pr-4 text-sm text-[#2f3a2f] outline-none focus:border-[#6B8E23]"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1">
              <Link
                href={dashboardHref}
                onClick={() => setIsOpen(false)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                  pathname === dashboardHref
                    ? "bg-[#6B8E23] text-white shadow-md shadow-[#6B8E23]/10"
                    : "text-[#4b5a4b] hover:bg-black/5 hover:text-[#2f3a2f]"
                }`}
              >
                Dashboard Home
              </Link>

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#4b5a4b] transition-all hover:bg-black/5 hover:text-[#2f3a2f]"
              >
                Back to Website
              </Link>
            </nav>
          </div>

          {!session && !loading && (
            <div className="flex flex-col gap-2 border-t border-[#d7dfc6]/60 pt-4">
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#a3b18a]/60 bg-white/60 text-sm font-semibold text-[#2f3a2f]"
              >
                <PersonFill size={16} />
                Login
              </Link>

              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#6B8E23] text-sm font-semibold text-white shadow-sm"
              >
                <ArrowRightToSquare size={14} />
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function NotificationBell({
  notificationCount,
  notifications,
  readNotifications,
  onRead,
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dfc6]/70 bg-white/60 text-[#2F3A2F] shadow-sm transition hover:bg-white"
        aria-label="Notifications"
      >
        <BellDot size={18} />

        {notificationCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {notificationCount}
          </span>
        )}
      </button>

      <div className="invisible absolute right-0 top-12 z-50 w-80 rounded-2xl border border-[#d7dfc6]/70 bg-white p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#2F3A2F]">Notifications</h4>
          <span className="rounded-full bg-[#EDF3E7] px-2 py-1 text-[10px] font-bold text-[#6B8E23]">
            {notificationCount} new
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((item) => {
              const isRead = readNotifications.includes(item.id);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => onRead(item.id)}
                  className={`block rounded-xl px-3 py-2 text-xs font-medium transition hover:bg-[#DDE5D0] ${
                    isRead
                      ? "bg-gray-100 text-gray-500"
                      : "bg-[#EDF3E7] text-[#4B5A42]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span>{item.text}</span>

                    {!isRead && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    )}
                  </div>

                  <span className="mt-1 block text-[10px] font-semibold text-[#6B8E23]">
                    Open →
                  </span>
                </Link>
              );
            })
          ) : (
            <p className="rounded-xl bg-[#EDF3E7] px-3 py-2 text-xs font-medium text-[#4B5A42]">
              No notifications available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}