"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ManageForumPostsPage() {
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const userId = user?.id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAllowed = role === "trainer" || role === "admin";

  useEffect(() => {
    const fetchPosts = async () => {
      if (isPending) return;

      if (!user) {
        window.location.href = "/auth/signin";
        return;
      }

      if (!isAllowed) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/forum-posts/author/${userId}`);

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
  }, [API_URL, user, userId, isPending, isAllowed]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
        <p className="text-center text-[#2F3A2F]">Loading your posts...</p>
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only trainers and admins can manage forum posts.
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this forum post?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/forum-posts/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete post.");
        return;
      }

      // Remove deleted post from UI
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

      alert("Post deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the post.");
    }
  };
  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-6xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#2F3A2F]">
              Manage Forum Posts
            </h1>
            <p className="mt-2 text-[#5D6B57]">
              View, edit, and manage your community posts.
            </p>
          </div>

          <Link
            href={`/dashboard/${role}/forum/create`}
            className="inline-flex items-center justify-center
  rounded-full
  bg-[#6B8E23]
  px-7 py-3
  font-bold
  text-[#2F3A2F]
  border-2 border-[#4F6B1B]
  shadow-xl
  hover:bg-[#55741C]
  transition-all"
          >
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">No posts yet</h2>
            <p className="mt-2 text-[#5D6B57]">
              Create your first forum post to share knowledge with the
              community.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white/60">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 bg-[#DDE5D0]/60 p-4 text-sm font-bold text-[#2F3A2F] md:grid">
              <span>Post</span>
              <span>Category</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-[#A3B18A]/20">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center"
                >
                  <div>
                    <h3 className="font-bold text-[#2F3A2F]">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-[#5D6B57]">
                      {post.shortDescription}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-[#4B5A42]">
                    {post.category || "General"}
                  </p>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      post.status === "published"
                        ? "bg-[#DDE5D0] text-[#556B2F]"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>

                  <div className="flex gap-3 md:justify-end">
                    <Link
                      href={`/dashboard/${role}/forum/edit/${post._id}`}
                      className="rounded-full border border-[#A3B18A] px-4 py-2 text-sm font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      type="button"
                      className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
