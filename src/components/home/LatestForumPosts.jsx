"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LatestForumPosts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <section className="bg-[#EDF3E7] px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#6B8E23]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#5A7A1E]">
            Community Forum
          </span>

          <h2 className="mt-5 text-4xl font-black text-[#2F3A2F] md:text-5xl">
            Latest Fitness Stories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#5D6B57]">
            Read the newest tips, insights, and motivation from our trainers and
            fitness community.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-[#2F3A2F]">Loading latest posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-[#5D6B57]">No forum posts found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-[30px] border border-white/50 bg-white/70 shadow-xl backdrop-blur-2xl"
              >
                <div className="relative h-52 bg-[#DDE5D0]">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#556B2F]">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#DDE5D0] px-3 py-1 text-xs font-bold text-[#556B2F]">
                    {post.category || "General"}
                  </span>

                  <h3 className="mt-4 line-clamp-2 text-xl font-bold text-[#2F3A2F]">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#5D6B57]">
                    By {post.authorName || "FitSphere"}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4B5A42]">
                    {post.shortDescription || post.content}
                  </p>

                  <Link
                  type="button"
                    href={`/forum/${post._id}`}
                    className="inline-flex items-center justify-center
  rounded-full
  !bg-[#6B8E23]
  w-full
  mt-3
  px-4 py-3
  font-bold
  !text-white
  border-2 border-[#4F6B1B]
  shadow-xl
  hover:bg-[#55741C]
  transition-all"
          >
                  
                    Read More
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