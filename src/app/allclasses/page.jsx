
"use client";

import React, { useEffect, useState, useRef } from "react";
import ClassCard from "../../components/ClassCard";
import { Pagination } from "@heroui/react";
import { BarsDescendingAlignCenter } from '@gravity-ui/icons';

const categories = [
  "All",
  "Yoga",
  "HIIT",
  "Strength",
  "Pilates",
  "Cardio",
  "CrossFit",
  "Meditation",
  "Boxing",
  "Zumba",
  "Functional Training",
];

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 6;

  // বাইরে ক্লিক করলে ক্যাটাগরি মেনু ড্রপডাউন বন্ধ করার হ্যান্ডলার
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchClasses = async () => {
      setLoading(true);
      try {
        const categoryParam = selectedCategory !== "All" ? `&category=${selectedCategory}` : "";
        const res = await fetch(
          `http://localhost:5000/api/classes?page=${page}&limit=${itemsPerPage}&search=${searchQuery}${categoryParam}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await res.json();
        setClasses(data.classes || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.totalItems || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchClasses();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchQuery, selectedCategory, mounted]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#e9f0e4]/40 dark:bg-zinc-950 px-6 py-20 transition-colors duration-300" />
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#e9f0e4]/40 dark:bg-zinc-950 px-6 py-20">
        <p className="text-center font-semibold text-red-500 dark:text-red-400 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 py-24 sm:px-12 md:px-16 lg:px-24 bg-linear-to-br from-[#e9f0e4]/60 via-[#deebd0]/40 to-[#d0e2be]/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 backdrop-blur-xl border border-[#c7d6b8]/40 dark:border-zinc-900 shadow-xl antialiased transition-colors duration-300">
      
      {/* Top Main Layout Header */}
      <div className="flex flex-col items-center gap-6 mb-12 border-b border-[#c7d6b8]/30 dark:border-zinc-800 pb-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-5xl">
            All Classes
          </h2>
          <p className="text-sm font-medium text-[#5D6B57] dark:text-zinc-400">
            Join expertly designed training sessions & achieve your goals
          </p>
        </div>

        {/* Dynamic Search Box Input Area */}
        <div className="relative w-full lg:max-w-xl" ref={dropdownRef}>
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-[#5D6B57] dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search classes by title or trainer..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-14 py-3.5 rounded-full border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md text-[#2F3A2F] dark:text-zinc-100 outline-none shadow-md focus:ring-2 focus:ring-[#2F3A2F]/20 dark:focus:ring-zinc-700 placeholder-[#5D6B57]/60 dark:placeholder-zinc-500 transition-all text-sm sm:text-base"
          />

          {/* Category Dropdown Trigger Toggle */}
          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className={`absolute inset-y-0 right-2 my-auto h-9 w-9 rounded-full flex items-center justify-center transition active:scale-95 ${
              selectedCategory !== "All"
                ? "bg-[#6B8E23]/10 dark:bg-[#87A96B]/10 text-[#6B8E23] dark:text-[#87A96B]"
                : "bg-transparent text-[#2F3A2F] dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
            }`}
          >
            <BarsDescendingAlignCenter className="h-5 w-5" />
          </button>

          {/* Floating Glassmorphic Category Deck Container */}
          {showCategories && (
            <div className="absolute right-0 top-15 z-50 w-64 rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-[#5D6B57] dark:text-zinc-500">
                Filter by category
              </p>

              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`rounded-2xl px-4 py-2 text-left text-sm font-semibold transition-all active:scale-[0.99] ${
                      selectedCategory === category
                        ? "bg-[#6B8E23] dark:bg-[#87A96B] text-white dark:text-zinc-950 shadow-md"
                        : "text-[#2F3A2F] dark:text-zinc-300 hover:bg-[#e9f0e4] dark:hover:bg-zinc-800/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Filter Indicator Pill */}
        {selectedCategory !== "All" && (
          <div className="flex items-center gap-3 rounded-full bg-white/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 text-xs sm:text-sm text-[#2F3A2F] dark:text-zinc-300 shadow-sm animate-in zoom-in-95 duration-200">
            <span>
              Category: <strong className="text-[#6B8E23] dark:text-[#87A96B]">{selectedCategory}</strong>
            </span>
            <button
              onClick={() => handleCategorySelect("All")}
              className="font-bold text-red-500 hover:text-red-600 dark:text-red-400 transition ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Primary Content Loading / Grid Deck Layout Manager */}
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <p className="text-lg font-medium text-[#2F3A2F] dark:text-zinc-400 animate-pulse">Loading classes layout...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="h-96 flex flex-col justify-center items-center text-center">
          <p className="text-xl font-bold text-[#2F3A2F] dark:text-zinc-200">No classes found</p>
          <p className="text-sm text-[#5D6B57] dark:text-zinc-400 mt-1 max-w-xs">
            Try another search string or change your active filtering deck.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {classes.map((item) => (
            <ClassCard key={item._id || item.title} item={item} />
          ))}
        </div>
      )}

      {/* Pagination Interface Footer Component Block */}
      {!loading && classes.length > 0 && (
        <Pagination className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#c7d6b8]/30 dark:border-zinc-800 pt-8">
          <Pagination.Summary className="text-sm font-semibold text-[#5D6B57] dark:text-zinc-400">
            Showing {startItem}-{endItem} of {totalItems} items
          </Pagination.Summary>

          <Pagination.Content className="flex items-center gap-2">
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-full border border-[#A3B18A] dark:border-zinc-800 text-[#2F3A2F] dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/60 transition hover:bg-[#e9f0e4] dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Pagination.PreviousIcon className="inline mr-1" />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>

            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis className="px-3 py-2 text-[#5D6B57] dark:text-zinc-500" />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all active:scale-95 ${
                      p === page
                        ? "bg-[#2F3A2F] dark:bg-zinc-100 text-white dark:text-zinc-950 border-[#2F3A2F] dark:border-zinc-100 shadow-md"
                        : "border-[#A3B18A] dark:border-zinc-800 text-[#2F3A2F] dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/60 hover:bg-[#e9f0e4] dark:hover:bg-zinc-800"
                    }`}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-full border border-[#A3B18A] dark:border-zinc-800 text-[#2F3A2F] dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/60 transition hover:bg-[#e9f0e4] dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <Pagination.NextIcon className="inline ml-1" />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </section>
  );
}