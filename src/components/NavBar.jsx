
"use client";

import React, { useEffect, useState } from "react";
import { PersonFill, ArrowRightToSquare, Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending: loading } = authClient.useSession();

  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Classes", href: "/allclasses" },
    { label: "Forums", href: "/forum" },
    {
      label: "Dashboard",
      href: `/dashboard/${session?.user?.role || "member"}`,
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsOpen(false);
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <header
        className={
          "fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 border-b border-[#d7dfc6]/60 px-4 transition-all duration-300 md:px-20 " +
          (scrolled
            ? "bg-[#f4f6ee]/85 py-1 shadow-md dark:bg-[#101510]/85"
            : "bg-[#f4f6ee]/60 py-2 dark:bg-[#101510]/70")
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
            aria-label="Open Navigation Drawer"
            className="flex rounded-lg p-2 text-[#2f3a2f] transition hover:bg-black/5 md:hidden dark:text-white dark:hover:bg-white/10"
          >
            <Bars size={20} />
          </button>

          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2.5 text-lg font-bold text-[#2f3a2f] dark:text-white"
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
            <span className="tracking-tight">FitSphere</span>
          </Link>

          <nav className="hidden items-center md:flex">
            <div className="flex items-center gap-1 rounded-full border border-[#d7dfc6]/60 bg-white/40 px-1.5 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
              {navItems
                .filter((item) => !(item.label === "Dashboard" && !session?.user))
                .map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={
                        "relative rounded-full px-4 py-2 text-sm font-medium transition " +
                        (isActive
                          ? "bg-white text-[#2f3a2f] shadow-sm dark:bg-white/15 dark:text-white"
                          : "text-[#4b5a4b] hover:text-[#2f3a2f] dark:text-white/70 dark:hover:text-white")
                      }
                    >
                      {item.label}

                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#6B8E23]" />
                      )}
                    </Link>
                  );
                })}
            </div>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            {!loading && session ? (
              <>
                <div className="flex items-center gap-2 border-r border-[#d7dfc6]/60 pr-2 dark:border-white/10">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#6B8E23] bg-white">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[#2f3a2f]">
                        <PersonFill size={14} />
                      </div>
                    )}
                  </div>

                  <span className="max-w-[100px] truncate text-xs font-semibold text-[#2f3a2f] dark:text-white">
                    {session.user?.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-full border border-red-200 bg-white/40 px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-[#2f3a2f] shadow-sm transition hover:bg-black/5 active:scale-95 dark:text-white dark:hover:bg-white/10"
                >
                  <PersonFill size={15} />
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-olive-900 shadow-sm transition hover:bg-[#5A7A1E] active:scale-95 dark:text-white"
                >
                  <ArrowRightToSquare size={14} />
                  Join Now
                </Link>
              </>
            )}
          </div>

          <div className="flex h-8 w-8 items-center justify-end md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2f3a2f]/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute bottom-0 left-0 top-0 flex w-72 max-w-[80vw] flex-col justify-between border-r border-white/40 bg-[#f4f6ee] p-6 shadow-2xl transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-[#101510] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-[#d7dfc6]/60 pb-4 dark:border-white/10">
              <span className="font-bold text-[#2f3a2f] dark:text-white">
                FitSphere
              </span>

              <div className="flex items-center gap-2">
                <ThemeToggle />

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-[#4b5a4b] hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                  aria-label="Close Side Drawer"
                >
                  <Xmark size={18} />
                </button>
              </div>
            </div>

            {!loading && session && (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#d7dfc6]/40 bg-white/50 p-3 dark:border-white/10 dark:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#6B8E23]">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
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
                    <span className="truncate text-sm font-bold text-[#2f3a2f] dark:text-white">
                      {session.user?.name}
                    </span>
                    <span className="truncate text-xs text-[#5D6B57] dark:text-white/60">
                      {session.user?.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700 transition active:scale-95 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                >
                  Sign Out
                </button>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              {navItems
                .filter((item) => !(item.label === "Dashboard" && !session?.user))
                .map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#6B8E23] text-olive-800 shadow-md shadow-[#6B8E23]/10"
                          : "text-[#4b5a4b] hover:bg-black/5 hover:text-[#2f3a2f] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          {!session && !loading && (
            <div className="flex flex-col gap-2 border-t border-[#d7dfc6]/60 pt-4 dark:border-white/10">
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#a3b18a]/60 bg-white/60 text-sm font-semibold text-black dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <PersonFill size={16} />
                Login
              </Link>

              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#6B8E23] text-sm font-semibold text-olive-900 shadow-sm"
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
