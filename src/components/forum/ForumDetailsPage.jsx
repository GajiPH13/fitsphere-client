// // "use client";
// // import { authClient } from "@/lib/auth-client";
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import Image from "next/image";
// // import Link from "next/link";

// // export default function ForumDetailsPage() {
// //   const { id } = useParams();

// //   const {data: session, isPending} = authClient.useSession();

// //   const user =session?.user;
// //   const userId = user?.id;
// //   const userName = user?.name;
// //   const userImage = user?.image;
// //   const isLoggedIn = Boolean(userId);

// //   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       try {
// //         setLoading(true);

// //         const res = await fetch(`${API_URL}/api/forum-posts/${id}`);

// //         if (!res.ok) {
// //           throw new Error("Post not found");
// //         }

// //         const data = await res.json();
// //         setPost(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) fetchPost();
// //   }, [id, API_URL]);

// //   if (loading) {
// //     return (
// //       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
// //         <p className="text-center text-[#2F3A2F]">Loading article...</p>
// //       </main>
// //     );
// //   }

// //   if (error || !post) {
// //     return (
// //       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
// //         <h1 className="text-3xl font-bold text-[#2F3A2F]">Post not found</h1>

// //         <Link
// //           href="/forum"
// //           className="mt-6 inline-block rounded-full bg-[#6B8E23] px-6 py-3 font-semibold text-white"
// //         >
// //           Back to Forum
// //         </Link>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="min-h-screen bg-[#EDF3E7] px-6 py-16 md:px-16 lg:px-24">
// //       <article className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-2xl">
// //         <div className="relative h-[420px] w-full">
// //           <Image
// //             src={post.image}
// //             alt={post.title}
// //             fill
// //             className="object-cover"
// //           />
// //         </div>

// //         <div className="p-8 md:p-12">
// //           <div className="flex flex-wrap items-center gap-3">
// //             <span className="rounded-full bg-[#DDE5D0] px-4 py-2 text-sm font-semibold text-[#556B2F]">
// //               {post.category || "General"}
// //             </span>

// //             <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold capitalize text-[#5D6B57]">
// //               {post.authorRole}
// //             </span>
// //           </div>

// //           <h1 className="mt-6 text-4xl font-black leading-tight text-[#2F3A2F] md:text-5xl">
// //             {post.title}
// //           </h1>

// //           <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#5D6B57]">
// //             <span>By {post.authorName}</span>
// //             <span>•</span>
// //             <span>
// //               {post.createdAt
// //                 ? new Date(post.createdAt).toLocaleDateString()
// //                 : "No date"}
// //             </span>
// //           </div>

// //           <p className="mt-8 text-lg leading-8 text-[#4B5A42]">
// //             {post.content}
// //           </p>

// //           <div className="mt-12">
// //             <Link
// //               href="/forum"
// //               className="inline-flex rounded-full border border-[#A3B18A] px-6 py-3 font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
// //             >
// //               ← Back to Forum
// //             </Link>
// //           </div>
// //         </div>
// //       </article>
// //     </main>
// //   );
// // }
// "use client";

// import { authClient } from "@/lib/auth-client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// export default function ForumDetailsPage() {
//   const { id } = useParams();

//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;
//   console.log(user);
//   const userId = user?.id;
//   const userName = user?.name;
//   const userImage = user?.image || "";
//   const isLoggedIn = Boolean(userId);
//   // console.log("UserImage:", userImage);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [commentsLoading, setCommentsLoading] = useState(true);
//   const [commentSubmitting, setCommentSubmitting] = useState(false);

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API_URL}/api/forum-posts/${id}`);

//         if (!res.ok) {
//           throw new Error("Post not found");
//         }

//         const data = await res.json();
//         setPost(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         setCommentsLoading(true);

//         const res = await fetch(`${API_URL}/api/forum-comments/${id}`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch comments");
//         }

//         const data = await res.json();
//         setComments(data);
//       } catch (err) {
//         console.error("Comment fetch error:", err);
//       } finally {
//         setCommentsLoading(false);
//       }
//     };

//     if (id) {
//       fetchPost();
//       fetchComments();
//     }
//   }, [id, API_URL]);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();

//     if (!isLoggedIn) {
//       alert("Please sign in to comment.");
//       return;
//     }

//     if (!commentText.trim()) {
//       alert("Comment cannot be empty.");
//       return;
//     }

//     setCommentSubmitting(true);

//     try {
//       const res = await fetch(`${API_URL}/api/forum-comments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           postId: id,
//           userId,
//           userName: userName || "Anonymous User",
//           userImage: userImage || "",
//           comment: commentText.trim(),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to post comment");
//         return;
//       }

//       setComments((prev) => [data.comment, ...prev]);
//       setCommentText("");
//       alert("Comment posted successfully!");
//     } catch (err) {
//       console.error("Comment submit error:", err);
//       alert("Something went wrong while posting comment.");
//     } finally {
//       setCommentSubmitting(false);
//     }
//   };

//   if (loading || isPending) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
//         <p className="text-center text-[#2F3A2F]">Loading article...</p>
//       </main>
//     );
//   }

//   if (error || !post) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Post not found</h1>

//         <Link
//           href="/forum"
//           className="mt-6 inline-block rounded-full bg-[#6B8E23] px-6 py-3 font-semibold text-white"
//         >
//           Back to Forum
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-16 md:px-16 lg:px-24">
//       <article className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-2xl">
//         <div className="relative h-[420px] w-full">
//           <Image
//             src={post.image}
//             alt={post.title}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="p-8 md:p-12">
//           <div className="flex flex-wrap items-center gap-3">
//             <span className="rounded-full bg-[#DDE5D0] px-4 py-2 text-sm font-semibold text-[#556B2F]">
//               {post.category || "General"}
//             </span>

//             <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold capitalize text-[#5D6B57]">
//               {post.authorRole}
//             </span>
//           </div>

//           <h1 className="mt-6 text-4xl font-black leading-tight text-[#2F3A2F] md:text-5xl">
//             {post.title}
//           </h1>

//           <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#5D6B57]">
//             <span>By {post.authorName}</span>
//             <span>•</span>
//             <span>
//               {post.createdAt
//                 ? new Date(post.createdAt).toLocaleDateString()
//                 : "No date"}
//             </span>
//           </div>

//           <p className="mt-8 text-lg leading-8 text-[#4B5A42]">
//             {post.content}
//           </p>

//           <section className="mt-14 border-t border-[#A3B18A]/30 pt-10">
//             <h2 className="text-3xl font-bold text-[#2F3A2F]">
//               Comments ({comments.length})
//             </h2>

//             {isLoggedIn ? (
//               <form onSubmit={handleSubmitComment} className="mt-6">
//                 <textarea
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   rows="4"
//                   placeholder="Write your comment..."
//                   className="w-full rounded-3xl border border-[#A3B18A] bg-white/80 p-5 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//                 />

//                 <button
//                   type="submit"
//                   disabled={commentSubmitting}
//                   className="mt-4 rounded-full bg-[#6B8E23] px-7 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
//                 >
//                   {commentSubmitting ? "Posting..." : "Post Comment"}
//                 </button>
//               </form>
//             ) : (
//               <div>
//               <div className="mt-6 rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-6">
//                 <p className="text-[#5D6B57]">
//                   Please sign in to join the discussion.
//                 </p>

                
//               </div>
//               <Link
//                 type="button"
//                   href={`/auth/signin?redirect=/forum/${id}`}
//                   className="mt-4  rounded-full outline bg-[#2F3A2F] px-6 py-3 font-semibold text-[#2F3A2F]"
//                 >
//                   Sign In to Comment
//                 </Link>
//               </div>
              
//             )}

//             <div className="mt-10 space-y-5">
//               {commentsLoading ? (
//                 <p className="text-[#5D6B57]">Loading comments...</p>
//               ) : comments.length === 0 ? (
//                 <p className="text-[#5D6B57]">
//                   No comments yet. Be the first to comment.
//                 </p>
//               ) : (
//                 comments.map((item, index) => (
//                   <div
//                     key={item._id || `${item.userId}-${index}`}
//                     className="rounded-3xl border border-white/50 bg-white/70 p-5"
//                   >
//                     <div className="flex items-center gap-3">
//                       {item.userImage ? (
//                         <Image
//                           src={item.userImage}
//                           alt={item.userName || "User"}
//                           width={44}
//                           height={44}
//                           className="h-11 w-11 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDE5D0] font-bold text-[#556B2F]">
//                           {item.userName?.charAt(0) || "U"}
//                         </div>
//                       )}

//                       <div>
//                         <p className="font-semibold text-[#2F3A2F]">
//                           {item.userName || "Anonymous User"}
//                         </p>
//                         <p className="text-xs text-[#5D6B57]">
//                           {item.createdAt
//                             ? new Date(item.createdAt).toLocaleString()
//                             : "Just now"}
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-4 leading-7 text-[#4B5A42]">
//                       {item.comment}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>

//           <div className="mt-12">
//             <Link
//               href="/forum"
//               className="inline-flex rounded-full border border-[#A3B18A] px-6 py-3 font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
//             >
//               ← Back to Forum
//             </Link>
//           </div>
//         </div>
//       </article>
//     </main>
//   );
// }
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

          <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-[#A3B18A]/30 py-6">
            <button
              type="button"
              onClick={() => handleVote("like")}
              disabled={voteLoading}
              className={`rounded-full px-5 py-3 font-semibold transition ${
                currentUserVote === "like"
                  ? "bg-[#6B8E23] text-white"
                  : "bg-white/70 text-[#2F3A2F] hover:bg-[#DDE5D0]"
              }`}
            >
              👍 Like {totalLikes}
            </button>

            <button
              type="button"
              onClick={() => handleVote("dislike")}
              disabled={voteLoading}
              className={`rounded-full px-5 py-3 font-semibold transition ${
                currentUserVote === "dislike"
                  ? "bg-[#6B8E23] text-white"
                  : "bg-white/70 text-[#2F3A2F] hover:bg-[#DDE5D0]"
              }`}
            >
              👎 Dislike {totalDislikes}
            </button>

            {!isLoggedIn && (
              <p className="text-sm text-[#5D6B57]">
                Sign in to vote on this post.
              </p>
            )}
          </div>

          <section className="mt-14 border-t border-[#A3B18A]/30 pt-10">
            <h2 className="text-3xl font-bold text-[#2F3A2F]">
              Comments ({comments.length})
            </h2>

            {isLoggedIn ? (
              <form onSubmit={handleSubmitComment} className="mt-6">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows="4"
                  placeholder="Write your comment..."
                  className="w-full rounded-3xl border border-[#A3B18A] bg-white/80 p-5 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
                />

                <button
                  type="submit"
                  disabled={commentSubmitting}
                  className="mt-4 rounded-full bg-[#6B8E23] px-7 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {commentSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </form>
            ) : (
              <div>
                <div className="mt-6 rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-6">
                  <p className="text-[#5D6B57]">
                    Please sign in to join the discussion.
                  </p>
                </div>

                <Link
                  href={`/auth/signin?redirect=/forum/${id}`}
                  className="mt-4 inline-flex rounded-full bg-[#2F3A2F] px-6 py-3 font-semibold text-white"
                >
                  Sign In to Comment
                </Link>
              </div>
            )}

            <div className="mt-10 space-y-5">
              {commentsLoading ? (
                <p className="text-[#5D6B57]">Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className="text-[#5D6B57]">
                  No comments yet. Be the first to comment.
                </p>
              ) : (
                comments.map((item, index) => (
                  <div
                    key={item._id || `${item.userId}-${index}`}
                    className="rounded-3xl border border-white/50 bg-white/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      {item.userImage ? (
                        <Image
                          src={item.userImage}
                          alt={item.userName || "User"}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDE5D0] font-bold text-[#556B2F]">
                          {item.userName?.charAt(0) || "U"}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-[#2F3A2F]">
                          {item.userName || "Anonymous User"}
                        </p>
                        <p className="text-xs text-[#5D6B57]">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : "Just now"}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-[#4B5A42]">
                      {item.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

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