"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@gravity-ui/icons";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme loading"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A3B18A]/40 bg-white/60 shadow-md backdrop-blur-md"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full border border-[#A3B18A]/40
        bg-white/60 text-[#2F3A2F]
        shadow-md backdrop-blur-md
        transition-all duration-300
        hover:scale-110 hover:bg-white/80

        dark:border-white/10
        dark:bg-[#1B2318]
        dark:text-yellow-300
        dark:hover:bg-[#243020]
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}