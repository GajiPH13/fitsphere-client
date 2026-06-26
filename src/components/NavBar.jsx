 "use client";

import React, { useEffect, useState } from "react";
import { PersonFill, ArrowRightToSquare, Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // Moving navItems inside the component gives it direct access to the 'session' state
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Classes", href: "/allclasses" },
    { label: "Trainers", href: "/trainerapplication" },
    { label: "Forums", href: "/forum" },
    { label: "Dashboard", href: `/dashboard/${session?.user?.role || "member"}` },
  ];

  // Handle Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch better-auth session data safely inside Client Component
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await authClient.getSession();
        if (res && res.data) {
          setSession(res.data.session ? res.data : null);
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [pathname]);

  // Better Auth Sign Out Handler
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
      setIsOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Use usePathname to determine the current path and conditionally render NavBar
    const pathName = usePathname();
    if (pathName.startsWith("/dashboard")) {
      return null; // Don't render NavBar on dashboard pages
    }

  return (
    <>
      <header
        className={
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full px-4 md:px-20 border-b border-[#d7dfc6]/60 transition-all duration-300 " +
          (scrolled ? "bg-[#f4f6ee]/85 shadow-md py-1" : "bg-[#f4f6ee]/60 py-2")
        }
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-2 md:px-6 py-2">
          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Drawer"
            className="flex md:hidden p-2 text-[#2f3a2f] hover:bg-black/5 rounded-lg transition"
          >
            <Bars size={20} />
          </button>

          {/* LOGO SECTION */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg text-[#2f3a2f] cursor-pointer"
          >
            <svg
              className="w-10 h-10"
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

          {/* DESKTOP NAV SECTION */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-1.5 py-1 rounded-full bg-white/40 border border-[#d7dfc6]/60 shadow-sm">
              {navItems
                // Fixed: Explicitly verify against 'session?.user' instead of the undefined 'user' variable
                .filter((item) => {
                  if (item.label === "Dashboard" && !session?.user) {
                    return false; 
                  }
                  return true; 
                })
                .map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={
                        "relative px-4 py-2 text-sm font-medium rounded-full transition " +
                        (isActive
                          ? "text-[#2f3a2f] bg-white shadow-sm"
                          : "text-[#4b5a4b] hover:text-[#2f3a2f]")
                      }
                    >
                      {item.label}

                      {isActive && (
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-1 w-5 h-[2px] bg-[#6B8E23] rounded-full" />
                      )}
                    </Link>
                  );
                })}
            </div>
          </nav>

          {/* DESKTOP ACTIONS SECTION */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && session ? (
              <>
                <div className="flex items-center gap-2 pr-2 border-r border-[#d7dfc6]/60">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#6B8E23] bg-white">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[#2f3a2f]">
                        <PersonFill size={14} />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#2f3a2f] max-w-[100px] truncate">
                    {session.user?.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 text-red-700 bg-white/40 hover:bg-red-50 font-medium transition text-sm shadow-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition text-sm shadow-sm active:scale-95 text-[#2f3a2f] hover:bg-black/5"
                >
                  <PersonFill size={15} />
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 px-5 py-2 rounded-full  text-[#2f3a2f] hover:bg-[#5A7A1E] font-medium transition text-sm shadow-sm active:scale-95"
                >
                  <ArrowRightToSquare size={14} />
                  Join Now
                </Link>
              </>
            )}
          </div>

          <div className="w-8 h-8 md:hidden" />
        </div>
      </header>

      {/* MOBILE DRAWER SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2f3a2f]/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-[#f4f6ee] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-white/40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#d7dfc6]/60">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2f3a2f]">FitSphere</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#4b5a4b]"
                aria-label="Close Side Drawer"
              >
                <Xmark size={18} />
              </button>
            </div>

            {/* CONDITIONAL SIGN OUT TOP-LEFT */}
            {!loading && session && (
              <div className="mb-6 p-3 rounded-2xl bg-white/50 border border-[#d7dfc6]/40 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#6B8E23]">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[#2f3a2f]">
                        <PersonFill size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#2f3a2f] truncate">
                      {session.user?.name}
                    </span>
                    <span className="text-xs text-[#5D6B57] truncate">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full h-10 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* MOBILE NAV LINKS LIST */}
            <nav className="flex flex-col gap-1">
              {navItems
                // Fixed: Apply identical filtering safeguard here for the mobile loop
                .filter((item) => !(item.label === "Dashboard" && !session?.user))
                .map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        isActive
                          ? "bg-[#6B8E23] text-white shadow-md shadow-[#6B8E23]/10"
                          : "text-[#4b5a4b] hover:bg-black/5 hover:text-[#2f3a2f]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          {!session && !loading && (
            <div className="flex flex-col gap-2 pt-4 border-t border-[#d7dfc6]/60">
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="w-full h-11 rounded-xl border border-[#a3b18a]/60 text-[#2f3a2f] bg-white/60 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <PersonFill size={16} />
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="w-full h-11 rounded-xl bg-[#6B8E23] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
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