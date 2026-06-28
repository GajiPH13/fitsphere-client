
// "use client";

// import React, { useEffect, useState } from "react";
// import ForumPostCard from "@/components/forum/ForumPostCard";

// export default function ForumPage() {
//   const [posts, setPosts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // থিম ফ্লিকার এবং হাইড্রেশন বাউন্স গার্ড স্টেট
//   const [mounted, setMounted] = useState(false);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     setMounted(true);

//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API_URL}/api/forum-posts`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch forum posts");
//         }

//         const data = await res.json();

//         if (data.success) {
//           setPosts(data.posts);
//         } else {
//           setPosts([]);
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [API_URL]);

//   const filteredPosts = Array.isArray(posts)
//     ? posts.filter((post) =>
//         `${post.title || ""} ${post.authorName || ""} ${post.category || ""}`
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       )
//     : [];

//   // মাউন্ট হওয়ার আগে ব্লাঙ্ক ট্র্যাকিং লেআউট যা থিম এরর বাউন্স কমাবে
//   if (!mounted) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 transition-colors duration-300" />
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 flex items-center justify-center p-10 transition-colors duration-300">
//         <p className="text-center font-semibold text-red-500 dark:text-red-400 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
//           {error}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-linear-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-24 md:px-16 lg:px-24 antialiased relative overflow-hidden transition-colors duration-300">
      
//       {/* Background Neon Glow Blur Effects */}
//       <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#6B8E23]/5 dark:bg-[#87A96B]/5 blur-[130px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#2F3A2F]/5 dark:bg-black/30 blur-[120px] pointer-events-none" />

//       <div className="relative mx-auto max-w-7xl z-10">
//         {/* Header Title Section */}
//         <div className="mb-12 text-center space-y-3">
//           <h1 className="text-4xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-6xl">
//             Community Forum
//           </h1>
//           <p className="mx-auto max-w-2xl text-base font-medium text-[#5D6B57] dark:text-zinc-400">
//             Fitness knowledge, tips, and updates from trainers and community admins.
//           </p>
//         </div>

//         {/* Live Search Input Component */}
//         <div className="mx-auto mb-16 max-w-xl">
//           <input
//             type="text"
//             placeholder="Search posts by title, author, or category..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full rounded-full border border-[#A3B18A] dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base text-[#2F3A2F] dark:text-zinc-100 outline-none shadow-lg dark:shadow-black/10 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-[#87A96B]/30 focus:border-[#6B8E23] dark:focus:border-[#87A96B] transition-all"
//           />
//         </div>

//         {/* Feed Logic Handling */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <p className="text-center font-medium text-[#2F3A2F] dark:text-zinc-400 animate-pulse">
//               Loading forum posts...
//             </p>
//           </div>
//         ) : filteredPosts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-lg font-medium text-[#5D6B57] dark:text-zinc-500">
//               No forum posts found matching your search.
//             </p>
//           </div>
//         ) : (
//           /* Cards Display Deck */
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {filteredPosts.map((post, index) => (
//               <ForumPostCard
//                 key={post._id?.$oid || post._id || `${post.title}-${index}`}
//                 post={post}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useRef, useState } from "react";
import ForumPostCard from "@/components/forum/ForumPostCard";
import { Pagination } from "@heroui/react";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [mounted, setMounted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const itemsPerPage = 6;
  const searchInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams({
          page: String(page),
          limit: String(itemsPerPage),
          status: "published",
          search: searchQuery.trim(),
        });

        const res = await fetch(`${API_URL}/api/forum-posts?${query}`);

        if (!res.ok) {
          throw new Error("Failed to fetch forum posts");
        }

        const data = await res.json();

        if (data.success) {
          setPosts(data.posts || []);
          setTotalPages(data.totalPages || 1);
          setTotalItems(data.totalItems || 0);
        } else {
          setPosts([]);
          setTotalPages(1);
          setTotalItems(0);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchPosts, 300);

    return () => clearTimeout(delayDebounce);
  }, [API_URL, mounted, page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];

    pages.push(1);

    if (page > 3) pages.push("ellipsis-start");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("ellipsis-end");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 transition-colors duration-300 dark:bg-zinc-950" />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] p-10 transition-colors duration-300 dark:bg-zinc-950">
        <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-center font-semibold text-red-500 dark:text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#EDF3E7] via-[#E4ECD9] to-[#D5E2C4] px-4 py-24 antialiased transition-colors duration-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#6B8E23]/5 blur-[130px] dark:bg-[#87A96B]/5" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#2F3A2F]/5 blur-[120px] dark:bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-4xl font-[family:var(--font-plus-jakarta)] font-weight-black tracking-tight text-[#2F3A2F] dark:text-zinc-50 md:text-6xl">
            Community Forum
          </h1>

          <p className="mx-auto max-w-2xl text-base font-medium text-[#5D6B57] dark:text-zinc-400">
            Fitness knowledge, tips, and updates from trainers and community
            admins.
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-xl">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search posts by title, author, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-[#A3B18A] bg-white/70 px-6 py-3.5 text-sm text-[#2F3A2F] shadow-lg outline-none backdrop-blur-md transition-all placeholder:text-zinc-400 focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/30 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:shadow-black/10 dark:placeholder:text-zinc-500 dark:focus:border-[#87A96B] dark:focus:ring-[#87A96B]/30 sm:text-base"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <p className="animate-pulse text-center font-medium text-[#2F3A2F] dark:text-zinc-400">
              Loading forum posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-medium text-[#5D6B57] dark:text-zinc-500">
              No forum posts found matching your search.
            </p>
          </div>
        ) : (
          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <ForumPostCard
                key={post._id?.$oid || post._id || `${post.title}-${index}`}
                post={post}
              />
            ))}
          </div>
        )}

        {!loading && posts.length > 0 && (
          <Pagination className="flex w-full flex-col items-center justify-between gap-6 border-t border-[#c7d6b8]/30 pt-8 dark:border-zinc-800 md:flex-row">
            <Pagination.Summary className="text-sm font-semibold text-[#5D6B57] dark:text-zinc-400">
              Showing {startItem}-{endItem} of {totalItems} posts
            </Pagination.Summary>

            <Pagination.Content className="flex items-center gap-2">
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-full border border-[#A3B18A] bg-white/80 px-4 py-2 text-[#2F3A2F] transition hover:bg-[#e9f0e4] disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <Pagination.PreviousIcon className="mr-1 inline" />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                typeof p === "string" ? (
                  <Pagination.Item key={`${p}-${i}`}>
                    <Pagination.Ellipsis className="px-3 py-2 text-[#5D6B57] dark:text-zinc-500" />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                        p === page
                          ? "border-[#2F3A2F] bg-[#2F3A2F] text-white shadow-md dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                          : "border-[#A3B18A] bg-white/80 text-[#2F3A2F] hover:bg-[#e9f0e4] dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-full border border-[#A3B18A] bg-white/80 px-4 py-2 text-[#2F3A2F] transition hover:bg-[#e9f0e4] disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <span>Next</span>
                  <Pagination.NextIcon className="ml-1 inline" />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        )}
      </div>
    </section>
  );
}