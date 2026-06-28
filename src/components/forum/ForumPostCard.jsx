
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function ForumPostCard({ post }) {
  // হাইড্রেশন মিসম্যাচ প্রতিরোধ করার জন্য মাউন্ট স্টেট গার্ড
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] rounded-[32px] bg-white/20 dark:bg-zinc-900/20 animate-pulse" />
    );
  }

  return (
    <article
      className="group overflow-hidden rounded-[32px] border border-white/40 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/20 backdrop-blur-2xl shadow-xl dark:shadow-black/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
    >
      <div>
        {/* Post Image */}
        <div className="relative h-56 overflow-hidden bg-[#DDE5D0] dark:bg-zinc-800">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-w-7xl) 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#556B2F] dark:text-zinc-500 font-medium text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Author Badge & Date */}
          <div className="flex items-center justify-between">
            <span
              className="rounded-full bg-[#DDE5D0] dark:bg-zinc-800 px-3 py-1 text-xs font-semibold text-[#556B2F] dark:text-[#A3B18A] capitalize"
            >
              {post.authorRole || "User"}
            </span>

            <span className="text-xs text-[#5D6B57] dark:text-zinc-400 font-medium">
              {post.createdAt 
                ? new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) 
                : ""}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-[family:var(--font-plus-jakarta)] text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100 line-clamp-2 leading-snug"
          >
            {post.title}
          </h2>

          {/* Author */}
          <p className="text-sm font-medium text-[#5D6B57] dark:text-zinc-400">
            By {post.authorName}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-7 text-[#4B5A42] dark:text-zinc-400/80 line-clamp-3"
          >
            {post.shortDescription || post.content}
          </p>
        </div>
      </div>

      {/* CTA Button Wrapper - Layout ঠিক রাখার জন্য কার্ডের নিচে পুশ করা হয়েছে */}
      <div className="p-6 pt-0">
        <Link
          href={`/forum/${post._id}`}
          className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#6B8E23] to-[#5A7A1E] dark:from-[#87A96B] dark:to-[#6B8E23] px-8 font-[family:var(--font-plus-jakarta)] text-base font-bold tracking-wide text-white dark:text-zinc-950 shadow-xl shadow-[#6B8E23]/20 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-2xl active:scale-[0.98]"
        >
          <span>Read More</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}