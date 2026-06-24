"use client";

import React, { useEffect, useState } from "react";
import ForumPostCard from "@/components/forum/ForumPostCard";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/forum-posts`);

        if (!res.ok) {
          throw new Error("Failed to fetch forum posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  const filteredPosts = posts.filter((post) =>
    `${post.title || ""} ${post.authorName || ""} ${post.category || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <section className="min-h-screen bg-[#EDF3E7] px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#2F3A2F]">
            Community Forum
          </h1>
          <p className="mt-3 text-[#5D6B57]">
            Fitness knowledge, tips, and updates from trainers and admins.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-xl">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#A3B18A] bg-white/80 px-6 py-3 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
          />
        </div>

        {loading ? (
          <p className="text-center text-[#2F3A2F]">Loading forum posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-[#5D6B57]">No forum posts found.</p>
        ) : (
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