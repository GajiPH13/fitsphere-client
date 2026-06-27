
"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ForumDetailsPage() {
  const { id } = useParams();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const userId = user?.id;
  const userName = user?.name;
  const userImage = user?.image || "";
  const isLoggedIn = Boolean(userId);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [currentUserVote, setCurrentUserVote] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

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

    const fetchComments = async () => {
      try {
        setCommentsLoading(true);

        const res = await fetch(`${API_URL}/api/forum-comments/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Comment fetch error:", err);
      } finally {
        setCommentsLoading(false);
      }
    };

    const fetchVotes = async () => {
      try {
        const voteUrl = userId
          ? `${API_URL}/api/forum-votes/${id}?userId=${userId}`
          : `${API_URL}/api/forum-votes/${id}`;

        const res = await fetch(voteUrl);

        if (!res.ok) {
          throw new Error("Failed to fetch votes");
        }

        const data = await res.json();

        setTotalLikes(data.totalLikes || 0);
        setTotalDislikes(data.totalDislikes || 0);
        setCurrentUserVote(data.currentUserVote || null);
      } catch (err) {
        console.error("Vote fetch error:", err);
      }
    };

    if (id) {
      fetchPost();
      fetchComments();
      fetchVotes();
    }
  }, [id, API_URL, userId]);

  const handleVote = async (voteType) => {
    if (!isLoggedIn) {
      alert("Please sign in to vote.");
      return;
    }

    setVoteLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/forum-votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          userId,
          voteType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update vote");
        return;
      }

      setTotalLikes(data.totalLikes || 0);
      setTotalDislikes(data.totalDislikes || 0);
      setCurrentUserVote(data.currentUserVote || null);
    } catch (err) {
      console.error("Vote submit error:", err);
      alert("Something went wrong while voting.");
    } finally {
      setVoteLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please sign in to comment.");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    setCommentSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/forum-comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          userId,
          userName: userName || "Anonymous User",
          userImage: userImage || "",
          comment: commentText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to post comment");
        return;
      }

      setComments((prev) => [data.comment, ...prev]);
      setCommentText("");
      alert("Comment posted successfully!");
    } catch (err) {
      console.error("Comment submit error:", err);
      alert("Something went wrong while posting comment.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading || isPending) {
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
    <main className="mt-18 min-h-screen bg-linear-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-12 md:px-8 lg:px-16 antialiased relative overflow-hidden">
      {/* Decorative glass background glow effects */}
      <div className="absolute top-[-5%] left-[-5%] h-96 w-96 rounded-full bg-[#6B8E23]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] h-[450px] w-[450px] rounded-full bg-[#2F3A2F]/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDE: PRIMARY ARTICLE VIEW */}
        <article className="lg:col-span-7 xl:col-span-8 overflow-hidden rounded-[32px] border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl">
          <div className="relative h-[280px] sm:h-[380px] md:h-[440px] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-[#6B8E23]/20 bg-white/75 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#5A7A1E] shadow-sm backdrop-blur-md">
                {post.category || "General"}
              </span>

              <span className="rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#5D6B57] shadow-sm backdrop-blur-md">
                {post.authorRole}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight leading-tight text-[#2F3A2F] md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#5D6B57]/90">
              <span className="flex items-center gap-1">By <span className="text-[#2F3A2F]">{post.authorName}</span></span>
              <span>•</span>
              <span>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })
                  : "No date"}
              </span>
            </div>

            <p className="mt-6 text-base font-[family:var(--font-plus-jakarta)] sm:text-lg leading-relaxed text-[#4B5A42] font-weight-medium whitespace-pre-line">
              {post.content}
            </p>

            {/* INTERACTION DECK */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-white/40 py-5">
              <button
                type="button"
                onClick={() => handleVote("like")}
                disabled={voteLoading}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition shadow-sm border ${
                  currentUserVote === "like"
                    ? "bg-[#6B8E23] text-white border-[#6B8E23]"
                    : "bg-white text-[#2F3A2F] border-white/60 hover:bg-[#EDF3E7]/80"
                }`}
              >
                👍 Like {totalLikes}
              </button>

              <button
                type="button"
                onClick={() => handleVote("dislike")}
                disabled={voteLoading}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition shadow-sm border ${
                  currentUserVote === "dislike"
                    ? "bg-[#6B8E23] text-white border-[#6B8E23]"
                    : "bg-white text-[#2F3A2F] border-white/60 hover:bg-[#EDF3E7]/80"
                }`}
              >
                👎 Dislike {totalDislikes}
              </button>

              {!isLoggedIn && (
                <p className="text-xs font-semibold text-[#5D6B57]/80 ml-1">
                  Sign in to vote on this post.
                </p>
              )}
            </div>

            <div className="mt-8">
              <Link
                href="/forum"
                className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/40 px-5 py-2.5 text-xs font-bold text-[#2F3A2F] shadow-sm backdrop-blur-md transition hover:bg-white/70"
              >
                ← Back to Forum
              </Link>
            </div>
          </div>
        </article>

        {/* RIGHT SIDE: FEEDBACK & COMMUNITY DISCUSSION */}
        <section className="lg:col-span-5 xl:col-span-4 rounded-[32px] border border-white/50 bg-white/40 p-6 md:p-8 shadow-xl backdrop-blur-xl flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#2F3A2F]">
              Discussion ({comments.length})
            </h2>
            <p className="text-xs font-medium text-[#5D6B57] mt-1">
              Share your insights and connect with other members.
            </p>
          </div>

          {/* COMMENT SUBMISSION SYSTEM */}
          {isLoggedIn ? (
            <form onSubmit={handleSubmitComment} className="flex flex-col gap-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                placeholder="Write your comment..."
                className="w-full rounded-2xl border border-white/60 bg-white p-4 text-sm text-[#2F3A2F] outline-none shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B8E23]/20"
              />

              <button
                type="submit"
                disabled={commentSubmitting}
                className="rounded-full bg-[#6B8E23] px-7 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {commentSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="rounded-2xl border border-white bg-white p-5 shadow-sm text-center">
              <p className="text-sm font-medium text-[#5D6B57]">
                Please sign in to join the discussion.
              </p>
              <Link
                href={`/auth/signin?redirect=/forum/${id}`}
                className="mt-3.5 w-full inline-flex items-center justify-center rounded-xl bg-[#2F3A2F] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#2F3A2F]/90"
              >
                Sign In to Comment
              </Link>
            </div>
          )}

          {/* DYNAMIC SCROLLABLE COMMENTS INDEX */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/60 scrollbar-track-transparent">
            {commentsLoading ? (
              <p className="text-sm font-medium text-[#5D6B57] animate-pulse">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-sm font-medium text-[#5D6B57]/80 italic py-4 text-center">
                No comments yet. Be the first to comment.
              </p>
            ) : (
              comments.map((item, index) => (
                <div
                  key={item._id || `${item.userId}-${index}`}
                  className="rounded-2xl border border-white bg-white p-4 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    {item.userImage ? (
                      <Image
                        src={item.userImage}
                        alt={item.userName || "User"}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDE5D0] text-xs font-bold text-[#556B2F]">
                        {item.userName?.charAt(0) || "U"}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-tight text-[#2F3A2F]">
                        {item.userName || "Anonymous User"}
                      </span>
                      <span className="text-[10px] font-medium text-[#5D6B57]/80">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
                          : "Just now"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#4B5A42] font-medium pl-0.5">
                    {item.comment}
                  </p>
                </div>
                ))
              )}
          </div>
        </section>
      </div>
    </main>
  );
}