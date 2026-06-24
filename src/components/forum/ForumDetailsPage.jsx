"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ForumDetailsPage() {
  const { id } = useParams();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/forum-posts/${id}`);

        if (!res.ok) {
          throw new Error("Post not found");
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id, API_URL]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
        <p className="text-center text-[#2F3A2F]">Loading article...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Post not found</h1>

        <Link
          href="/forum"
          className="mt-6 inline-block rounded-full bg-[#6B8E23] px-6 py-3 font-semibold text-white"
        >
          Back to Forum
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-16 md:px-16 lg:px-24">
      <article className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-2xl">
        <div className="relative h-[420px] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#DDE5D0] px-4 py-2 text-sm font-semibold text-[#556B2F]">
              {post.category || "General"}
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold capitalize text-[#5D6B57]">
              {post.authorRole}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight text-[#2F3A2F] md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#5D6B57]">
            <span>By {post.authorName}</span>
            <span>•</span>
            <span>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : "No date"}
            </span>
          </div>

          <p className="mt-8 text-lg leading-8 text-[#4B5A42]">
            {post.content}
          </p>

          <div className="mt-12">
            <Link
              href="/forum"
              className="inline-flex rounded-full border border-[#A3B18A] px-6 py-3 font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
            >
              ← Back to Forum
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}