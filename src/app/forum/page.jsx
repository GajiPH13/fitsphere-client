
"use client";

import React, { useEffect, useState } from "react";
import ForumPostCard from "@/components/forum/ForumPostCard";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // থিম ফ্লিকার এবং হাইড্রেশন বাউন্স গার্ড স্টেট
  const [mounted, setMounted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    setMounted(true);

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/forum-posts`);

        if (!res.ok) {
          throw new Error("Failed to fetch forum posts");
        }

        const data = await res.json();

        if (data.success) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  const filteredPosts = Array.isArray(posts)
    ? posts.filter((post) =>
        `${post.title || ""} ${post.authorName || ""} ${post.category || ""}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  // মাউন্ট হওয়ার আগে ব্লাঙ্ক ট্র্যাকিং লেআউট যা থিম এরর বাউন্স কমাবে
  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 transition-colors duration-300" />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 flex items-center justify-center p-10 transition-colors duration-300">
        <p className="text-center font-semibold text-red-500 dark:text-red-400 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-24 md:px-16 lg:px-24 antialiased relative overflow-hidden transition-colors duration-300">
      
      {/* Background Neon Glow Blur Effects */}
      <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#6B8E23]/5 dark:bg-[#87A96B]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#2F3A2F]/5 dark:bg-black/30 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Header Title Section */}
        <div className="mb-12 text-center space-y-3">
          <h1 className="text-4xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-6xl">
            Community Forum
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium text-[#5D6B57] dark:text-zinc-400">
            Fitness knowledge, tips, and updates from trainers and community admins.
          </p>
        </div>

        {/* Live Search Input Component */}
        <div className="mx-auto mb-16 max-w-xl">
          <input
            type="text"
            placeholder="Search posts by title, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#A3B18A] dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base text-[#2F3A2F] dark:text-zinc-100 outline-none shadow-lg dark:shadow-black/10 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-[#87A96B]/30 focus:border-[#6B8E23] dark:focus:border-[#87A96B] transition-all"
          />
        </div>

        {/* Feed Logic Handling */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-center font-medium text-[#2F3A2F] dark:text-zinc-400 animate-pulse">
              Loading forum posts...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-[#5D6B57] dark:text-zinc-500">
              No forum posts found matching your search.
            </p>
          </div>
        ) : (
          /* Cards Display Deck */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <ForumPostCard
                key={post._id?.$oid || post._id || `${post.title}-${index}`}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}