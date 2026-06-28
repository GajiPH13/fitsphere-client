
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function LatestForumPosts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন মিসম্যাচ পুরোপুরি বন্ধ করতে মাউন্ট লাইফসাইকেল কন্ট্রোল
  useEffect(() => {
    setMounted(true);

    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/forum-posts?status=published&limit=4`
        );
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts || data || []);
        }
      } catch (error) {
        console.error("Failed to fetch latest forum posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [API_URL]);

  // কম্পোনেন্ট ব্রাউজারে মাউন্ট হওয়ার আগে সার্ভার ট্রির সাথে সিঙ্কড ব্লাঙ্ক লেআউট রাখবে
  if (!mounted) {
    return null;
  }

  return (
    <section className="bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-24 md:px-16 lg:px-24 antialiased transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[#6B8E23]/10 dark:bg-zinc-900/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5A7A1E] dark:text-[#A3B18A] border border-transparent dark:border-zinc-800">
            Community Forum
          </span>

          <h2 className="mt-5 text-3xl font-(--font-plus-jakarta) font-weight-extrabold text-[#2F3A2F] dark:text-zinc-50 md:text-5xl tracking-tight">
            Latest Fitness Stories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#5D6B57] dark:text-zinc-400 font-medium">
            Read the newest tips, insights, and motivation from our trainers and
            fitness community.
          </p>
        </div>

        {/* LOADING & EMPTY STATES */}
        {loading ? (
          <p className="text-center text-[#2F3A2F] dark:text-zinc-400 font-medium">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-[#5D6B57] dark:text-zinc-500 font-medium">No forum posts found.</p>
        ) : (
          /* POSTS GRID */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-[30px] border border-white/50 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/20 shadow-xl dark:shadow-black/10 backdrop-blur-2xl flex flex-col justify-between transition-colors duration-300"
              >
                <div>
                  {/* POST IMAGE BANNER */}
                  <div className="relative h-52 bg-[#DDE5D0] dark:bg-zinc-800 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-w-7xl) 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#556B2F] dark:text-zinc-500 font-medium text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* POST DETAILS */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="rounded-full bg-[#DDE5D0] dark:bg-zinc-800 px-3 py-1 text-xs font-bold text-[#556B2F] dark:text-[#A3B18A]">
                        {post.category || "General"}
                      </span>
                    </div>

                    <h3 className="font-(--font-plus-jakarta) font-weight-bold line-clamp-2 text-xl text-[#2F3A2F] dark:text-zinc-100">
                      {post.title}
                    </h3>

                    <p className="text-sm font-medium text-[#5D6B57] dark:text-zinc-400">
                      By {post.authorName || "FitSphere"}
                    </p>

                    <p className="line-clamp-3 text-sm leading-6 text-[#4B5A42] dark:text-zinc-400/80">
                      {post.shortDescription || post.content}
                    </p>
                  </div>
                </div>

                {/* ERROR ZONE FIXED: STABLE SINGLE-LINE CLASSNAME FOR LINK */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/forum/${post._id}`}
                    className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] px-8 font-[family:var(--font-plus-jakarta)] text-base font-bold tracking-wide text-white dark:text-zinc-950 shadow-xl shadow-[#6B8E23]/20 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-2xl active:scale-[0.98]"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}