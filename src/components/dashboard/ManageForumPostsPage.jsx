
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { Button } from "@heroui/react";
// import toast from "react-hot-toast";

// export default function ManageForumPostsPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   const user = session?.user;
//   const role = user?.role;
//   const userId = user?.id;

//   const isAllowed = role === "trainer" || role === "admin";

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (isPending) return;

//       if (!user) {
//         router.replace("/auth/signin");
//         return;
//       }

//       if (!isAllowed) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);

//         const res = await fetch(`${API_URL}/api/forum-posts/author/${userId}`);

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch forum posts");
//         }

//         setPosts(Array.isArray(data) ? data : data.posts || []);
//       } catch (err) {
//         setError(err.message);
//         toast.error(err.message || "Failed to fetch forum posts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [API_URL, user, userId, isPending, isAllowed, router]);

//   const openDeleteModal = (post) => {
//     setSelectedPost(post);
//     setIsOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setSelectedPost(null);
//     setIsOpen(false);
//   };

//   const handleDelete = async () => {
//     if (!selectedPost?._id) {
//       toast.error("No post selected.");
//       return;
//     }

//     setDeleteLoading(true);

//     const deletePromise = async () => {
//       const res = await fetch(`${API_URL}/api/forum-posts/${selectedPost._id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": user?.id,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete post.");
//       }

//       setPosts((prevPosts) =>
//         prevPosts.filter((post) => post._id !== selectedPost._id)
//       );

//       closeDeleteModal();

//       return "Post deleted successfully.";
//     };

//     try {
//       await toast.promise(deletePromise(), {
//         loading: "Deleting post...",
//         success: (message) => message,
//         error: (err) =>
//           err.message || "Something went wrong while deleting the post.",
//       });
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   if (isPending || loading) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
//         <p className="text-center text-[#2F3A2F]">Loading your posts...</p>
//       </main>
//     );
//   }

//   if (!isAllowed) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only trainers and admins can manage forum posts.
//         </p>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <p className="text-red-500">{error}</p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-6xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
//         <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
//           <div>
//             <h1 className="text-4xl font-black text-[#2F3A2F]">
//               Manage Forum Posts
//             </h1>
//             <p className="mt-2 text-[#5D6B57]">
//               View, edit, and manage your community posts.
//             </p>
//           </div>

//           <Link
//             href={`/dashboard/${role}/forum/create`}
//             className="inline-flex items-center justify-center rounded-full border-2 border-[#4F6B1B] bg-[#6B8E23] px-7 py-3 font-bold text-black shadow-xl transition-all hover:bg-[#55741C]"
//           >
//             Create New Post
//           </Link>
//         </div>

//         {posts.length === 0 ? (
//           <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
//             <h2 className="text-2xl font-bold text-[#2F3A2F]">No posts yet</h2>
//             <p className="mt-2 text-[#5D6B57]">
//               Create your first forum post to share knowledge with the
//               community.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white/60">
//             <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 bg-[#DDE5D0]/60 p-4 text-sm font-bold text-[#2F3A2F] md:grid">
//               <span>Post</span>
//               <span>Category</span>
//               <span>Status</span>
//               <span className="text-right">Actions</span>
//             </div>

//             <div className="divide-y divide-[#A3B18A]/20">
//               {posts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center"
//                 >
//                   <div>
//                     <h3 className="font-bold text-[#2F3A2F]">{post.title}</h3>
//                     <p className="mt-1 line-clamp-2 text-sm text-[#5D6B57]">
//                       {post.shortDescription}
//                     </p>
//                   </div>

//                   <p className="text-sm font-medium text-[#4B5A42]">
//                     {post.category || "General"}
//                   </p>

//                   <span
//                     className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
//                       post.status === "published"
//                         ? "bg-[#DDE5D0] text-[#556B2F]"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {post.status || "draft"}
//                   </span>

//                   <div className="flex gap-3 md:justify-end">
//                     <Link
//                       href={`/dashboard/${role}/forum/edit/${post._id}`}
//                       className="rounded-full border border-[#A3B18A] px-4 py-2 text-sm font-semibold text-[#2F3A2F] transition hover:bg-[#DDE5D0]"
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       onClick={() => openDeleteModal(post)}
//                       type="button"
//                       className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </section>

//       {isOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
//             <h2 className="text-2xl font-black text-red-600">
//               Delete Forum Post
//             </h2>

//             <p className="mt-4 text-[#4B5A42]">
//               Are you sure you want to delete{" "}
//               <span className="font-bold text-[#2F3A2F]">
//                 {selectedPost?.title}
//               </span>
//               ?
//             </p>

//             <p className="mt-2 text-sm text-gray-500">
//               This action cannot be undone.
//             </p>

//             <div className="mt-6 flex justify-end gap-3">
//               <Button
//                 variant="bordered"
//                 onPress={closeDeleteModal}
//                 isDisabled={deleteLoading}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 color="danger"
//                 onPress={handleDelete}
//                 isDisabled={deleteLoading}
//               >
//                 {deleteLoading ? "Deleting..." : "Delete"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function ManageForumPostsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const userId = user?.id;

  const isAllowed = role === "trainer" || role === "admin";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (isPending) return;

      if (!user) {
        router.replace("/auth/signin");
        return;
      }

      if (!isAllowed) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/forum-posts/author/${userId}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch forum posts");
        }

        setPosts(Array.isArray(data) ? data : data.posts || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch forum posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL, user, userId, isPending, isAllowed, router]);

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedPost?._id) {
      toast.error("No post selected.");
      return;
    }

    setDeleteLoading(true);

    const deletePromise = async () => {
      const res = await fetch(`${API_URL}/api/forum-posts/${selectedPost._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete post.");
      }

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== selectedPost._id)
      );

      closeDeleteModal();

      return "Post deleted successfully.";
    };

    try {
      await toast.promise(deletePromise(), {
        loading: "Deleting post...",
        success: (message) => message,
        error: (err) =>
          err.message || "Something went wrong while deleting the post.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 transition-colors">
        <p className="text-center text-[#2F3A2F] dark:text-zinc-400">Loading your posts...</p>
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 text-center transition-colors">
        <h1 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-100">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57] dark:text-zinc-400">
          Only trainers and admins can manage forum posts.
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 text-center transition-colors">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-12 transition-colors md:px-16 lg:px-24">
      <section className="mx-auto max-w-6xl rounded-[36px] border border-white/40 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#2F3A2F] dark:text-zinc-100">
              Manage Forum Posts
            </h1>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              View, edit, and manage your community posts.
            </p>
          </div>

          <Link
            href={`/dashboard/${role}/forum/create`}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#4F6B1B] bg-[#6B8E23] px-7 py-3 font-bold text-white dark:text-zinc-100 shadow-xl transition-all hover:bg-[#55741C]"
          >
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">No posts yet</h2>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Create your first forum post to share knowledge with the community.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-[#A3B18A]/30 dark:border-zinc-800 bg-[#DDE5D0]/60 dark:bg-zinc-800/60 p-4 text-sm font-bold text-[#2F3A2F] dark:text-zinc-200 md:grid">
              <span>Post</span>
              <span>Category</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-[#A3B18A]/20 dark:divide-zinc-800">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="grid gap-4 p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center"
                >
                  <div>
                    <h3 className="font-bold text-[#2F3A2F] dark:text-zinc-100">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-[#5D6B57] dark:text-zinc-400">
                      {post.shortDescription}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-[#4B5A42] dark:text-zinc-300">
                    {post.category || "General"}
                  </p>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      post.status === "published"
                        ? "bg-[#DDE5D0] dark:bg-green-950/40 text-[#556B2F] dark:text-green-400"
                        : "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400"
                    }`}
                  >
                    {post.status || "draft"}
                  </span>

                  <div className="flex gap-3 md:justify-end">
                    <Link
                      href={`/dashboard/${role}/forum/edit/${post._id}`}
                      className="rounded-full border border-[#A3B18A] dark:border-zinc-700 px-4 py-2 text-sm font-semibold text-[#2F3A2F] dark:text-zinc-300 transition hover:bg-[#DDE5D0] dark:hover:bg-zinc-800"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => openDeleteModal(post)}
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

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-transparent dark:border-zinc-800">
            <h2 className="text-2xl font-black text-red-600 dark:text-red-500">
              Delete Forum Post
            </h2>

            <p className="mt-4 text-[#4B5A42] dark:text-zinc-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                {selectedPost?.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={closeDeleteModal}
                isDisabled={deleteLoading}
                className="dark:border-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </Button>

              <Button
                color="danger"
                onPress={handleDelete}
                isDisabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}