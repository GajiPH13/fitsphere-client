// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import { authClient } from "@/lib/auth-client";
// // import Link from "next/link";

// // export default function EditForumPostPage() {
// //   const { id } = useParams();
// //   const router = useRouter();
// //   const { data: session, isPending } = authClient.useSession();

// //   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// //   const user = session?.user;
// //   const role = user?.role;
// //   const isAllowed = role === "trainer" || role === "admin";

// //   const [loading, setLoading] = useState(true);
// //   const [updating, setUpdating] = useState(false);

// //   const [formData, setFormData] = useState({
// //     title: "",
// //     image: "",
// //     shortDescription: "",
// //     content: "",
// //     category: "Fitness Tips",
// //     status: "published",
// //   });

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       if (isPending) return;

// //       if (!user) {
// //         router.push("/auth/signin");
// //         return;
// //       }

// //       if (!isAllowed) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const res = await fetch(`${API_URL}/api/forum-posts/${id}`);
// //         const data = await res.json();

// //         if (!res.ok) {
// //           alert(data.message || "Post not found");
// //           router.push(`/dashboard/${role}/forum`);
// //           return;
// //         }

// //         setFormData({
// //           title: data.title || "",
// //           image: data.image || "",
// //           shortDescription: data.shortDescription || "",
// //           content: data.content || "",
// //           category: data.category || "Fitness Tips",
// //           status: data.status || "published",
// //         });
// //       } catch (error) {
// //         console.error("Fetch post error:", error);
// //         alert("Failed to load post.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) fetchPost();
// //   }, [id, API_URL, user, role, isAllowed, isPending, router]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();

// //     setUpdating(true);

// //     try {
// //       const res = await fetch(`${API_URL}/api/forum-posts/${id}`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         alert(data.message || "Failed to update post");
// //         return;
// //       }

// //       alert("Forum post updated successfully!");
// //       router.push(`/dashboard/${role}/forum`);
// //     } catch (error) {
// //       console.error("Update post error:", error);
// //       alert("Something went wrong.");
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   if (isPending || loading) {
// //     return <p className="p-10 text-center">Loading post...</p>;
// //   }

// //   if (!isAllowed) {
// //     return (
// //       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
// //         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
// //         <p className="mt-3 text-[#5D6B57]">
// //           Only trainers and admins can edit forum posts.
// //         </p>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="min-h-screen bg-[#EDF3E7] px-6 py-16 md:px-16 lg:px-24">
// //       <section className="mx-auto max-w-4xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
// //         <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
// //           <div>
// //             <h1 className="text-4xl font-black text-[#2F3A2F]">
// //               Edit Forum Post
// //             </h1>
// //             <p className="mt-2 text-[#5D6B57]">
// //               Update your community article.
// //             </p>
// //           </div>

// //           <Link
// //             href={`/dashboard/${role}/forum`}
// //             className="rounded-full border border-[#A3B18A] px-5 py-3 text-center font-semibold text-[#2F3A2F] hover:bg-[#DDE5D0]"
// //           >
// //             Back
// //           </Link>
// //         </div>

// //         <form onSubmit={handleUpdate} className="space-y-6">
// //           <input
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             placeholder="Post title"
// //             required
// //             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //           />

// //           <input
// //             name="image"
// //             value={formData.image}
// //             onChange={handleChange}
// //             placeholder="Image URL"
// //             required
// //             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //           />

// //           <textarea
// //             name="shortDescription"
// //             value={formData.shortDescription}
// //             onChange={handleChange}
// //             placeholder="Short description"
// //             rows="3"
// //             required
// //             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //           />

// //           <textarea
// //             name="content"
// //             value={formData.content}
// //             onChange={handleChange}
// //             placeholder="Full content"
// //             rows="8"
// //             required
// //             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //           />

// //           <div className="grid gap-5 md:grid-cols-2">
// //             <select
// //               name="category"
// //               value={formData.category}
// //               onChange={handleChange}
// //               className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //             >
// //               <option>Fitness Tips</option>
// //               <option>Nutrition</option>
// //               <option>Yoga</option>
// //               <option>Strength Training</option>
// //               <option>Recovery</option>
// //               <option>Mindset</option>
// //               <option>Workout Planning</option>
// //             </select>

// //             <select
// //               name="status"
// //               value={formData.status}
// //               onChange={handleChange}
// //               className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
// //             >
// //               <option value="published">Published</option>
// //               <option value="draft">Draft</option>
// //             </select>
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={updating}
// //             className="w-full rounded-full bg-[#6B8E23] py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
// //           >
// //             {updating ? "Updating..." : "Update Post"}
// //           </button>
// //         </form>
// //       </section>
// //     </main>
// //   );
// // }
// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import { Button } from "@heroui/react";
// import toast from "react-hot-toast";

// export default function EditForumPostPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   const user = session?.user;
//   const role = user?.role;
//   const isAllowed = role === "trainer" || role === "admin";

//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     shortDescription: "",
//     content: "",
//     category: "Fitness Tips",
//     status: "published",
//   });

//   useEffect(() => {
//     const fetchPost = async () => {
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
//         const res = await fetch(`${API_URL}/api/forum-posts/${id}`);
//         const data = await res.json();

//         if (!res.ok) {
//           toast.error(data.message || "Post not found");
//           router.push(`/dashboard/${role}/forum`);
//           return;
//         }

//         setFormData({
//           title: data.title || "",
//           image: data.image || "",
//           shortDescription: data.shortDescription || "",
//           content: data.content || "",
//           category: data.category || "Fitness Tips",
//           status: data.status || "published",
//         });
//       } catch (error) {
//         console.error("Fetch post error:", error);
//         toast.error("Failed to load post.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchPost();
//   }, [id, API_URL, user, role, isAllowed, isPending, router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const openUpdateModal = (e) => {
//     e.preventDefault();
//     setIsOpen(true);
//   };

//   const handleUpdate = async () => {
//     if (!user?.id) {
//       toast.error("Unauthorized. User ID is missing.");
//       return;
//     }

//     setUpdating(true);

//     const updatePromise = async () => {
//       const res = await fetch(`${API_URL}/api/forum-posts/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": user.id,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update post");
//       }

//       setIsOpen(false);

//       return "Forum post updated successfully!";
//     };

//     try {
//       await toast.promise(updatePromise(), {
//         loading: "Updating post...",
//         success: (message) => message,
//         error: (err) => err.message || "Something went wrong.",
//       });

//       router.push(`/dashboard/${role}/forum`);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (isPending || loading) {
//     return <p className="p-10 text-center">Loading post...</p>;
//   }

//   if (!isAllowed) {
//     return (
//       <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
//         <p className="mt-3 text-[#5D6B57]">
//           Only trainers and admins can edit forum posts.
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-16 md:px-16 lg:px-24">
//       <section className="mx-auto max-w-4xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
//         <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
//           <div>
//             <h1 className="text-4xl font-black text-[#2F3A2F]">
//               Edit Forum Post
//             </h1>
//             <p className="mt-2 text-[#5D6B57]">
//               Update your community article.
//             </p>
//           </div>

//           <Link
//             href={`/dashboard/${role}/forum`}
//             className="rounded-full border border-[#A3B18A] px-5 py-3 text-center font-semibold text-[#2F3A2F] hover:bg-[#DDE5D0]"
//           >
//             Back
//           </Link>
//         </div>

//         <form onSubmit={openUpdateModal} className="space-y-6">
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Post title"
//             required
//             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//           />

//           <input
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="Image URL"
//             required
//             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//           />

//           <textarea
//             name="shortDescription"
//             value={formData.shortDescription}
//             onChange={handleChange}
//             placeholder="Short description"
//             rows="3"
//             required
//             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//           />

//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             placeholder="Full content"
//             rows="8"
//             required
//             className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//           />

//           <div className="grid gap-5 md:grid-cols-2">
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//             >
//               <option>Fitness Tips</option>
//               <option>Nutrition</option>
//               <option>Yoga</option>
//               <option>Strength Training</option>
//               <option>Recovery</option>
//               <option>Mindset</option>
//               <option>Workout Planning</option>
//             </select>

//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-[#A3B18A] bg-white/80 p-4 text-[#2F3A2F] outline-none focus:ring-2 focus:ring-[#6B8E23]/30"
//             >
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className="w-full rounded-full bg-[#6B8E23] py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
//           >
//             {updating ? "Updating..." : "Update Post"}
//           </button>
//         </form>
//       </section>

//       {isOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
//             <h2 className="text-2xl font-black text-[#2F3A2F]">
//               Update Forum Post
//             </h2>

//             <p className="mt-4 text-[#4B5A42]">
//               Are you sure you want to update{" "}
//               <span className="font-bold text-[#2F3A2F]">
//                 {formData.title}
//               </span>
//               ?
//             </p>

//             <p className="mt-2 text-sm text-gray-500">
//               Your changes will be saved immediately.
//             </p>

//             <div className="mt-6 flex justify-end gap-3">
//               <Button
//                 variant="bordered"
//                 onPress={() => setIsOpen(false)}
//                 isDisabled={updating}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 color="primary"
//                 onPress={handleUpdate}
//                 isDisabled={updating}
//               >
//                 {updating ? "Updating..." : "Update"}
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
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function EditForumPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const isAllowed = role === "trainer" || role === "admin";

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    shortDescription: "",
    content: "",
    category: "Fitness Tips",
    status: "published",
  });

  useEffect(() => {
    const fetchPost = async () => {
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
        const res = await fetch(`${API_URL}/api/forum-posts/${id}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Post not found");
          router.push(`/dashboard/${role}/forum`);
          return;
        }

        setFormData({
          title: data.title || "",
          image: data.image || "",
          shortDescription: data.shortDescription || "",
          content: data.content || "",
          category: data.category || "Fitness Tips",
          status: data.status || "published",
        });
      } catch (error) {
        console.error("Fetch post error:", error);
        toast.error("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id, API_URL, user, role, isAllowed, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openUpdateModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    if (!user?.id) {
      toast.error("Unauthorized. User ID is missing.");
      return;
    }

    setUpdating(true);

    const updatePromise = async () => {
      const res = await fetch(`${API_URL}/api/forum-posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      setIsOpen(false);

      return "Forum post updated successfully!";
    };

    try {
      await toast.promise(updatePromise(), {
        loading: "Updating post...",
        success: (message) => message,
        error: (err) => err.message || "Something went wrong.",
      });

      router.push(`/dashboard/${role}/forum`);
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 transition-colors">
        <p className="text-center text-[#2F3A2F] dark:text-zinc-400">Loading post...</p>
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 text-center transition-colors">
        <h1 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-100">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57] dark:text-zinc-400">
          Only trainers and admins can edit forum posts.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-16 transition-colors md:px-16 lg:px-24">
      <section className="mx-auto max-w-4xl rounded-[36px] border border-white/40 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black text-[#2F3A2F] dark:text-zinc-100">
              Edit Forum Post
            </h1>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Update your community article.
            </p>
          </div>

          <Link
            href={`/dashboard/${role}/forum`}
            className="rounded-full border border-[#A3B18A] dark:border-zinc-700 px-5 py-3 text-center font-semibold text-[#2F3A2F] dark:text-zinc-300 transition hover:bg-[#DDE5D0] dark:hover:bg-zinc-800"
          >
            Back
          </Link>
        </div>

        <form onSubmit={openUpdateModal} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post title"
            required
            className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
          />

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short description"
            rows={3}
            required
            className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Full content"
            rows={8}
            required
            className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
            >
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Fitness Tips</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Nutrition</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Yoga</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Strength Training</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Recovery</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Mindset</option>
              <option className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Workout Planning</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#A3B18A] dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-4 text-[#2F3A2F] dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#6B8E23]/30 dark:focus:ring-zinc-700"
            >
              <option value="published" className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Published</option>
              <option value="draft" className="bg-white dark:bg-zinc-900 text-[#2F3A2F] dark:text-zinc-100">Draft</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full rounded-full bg-[#6B8E23] py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-zinc-700"
          >
            {updating ? "Updating..." : "Update Post"}
          </button>
        </form>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-transparent dark:border-zinc-800">
            <h2 className="text-2xl font-black text-[#2F3A2F] dark:text-zinc-100">
              Update Forum Post
            </h2>

            <p className="mt-4 text-[#4B5A42] dark:text-zinc-300">
              Are you sure you want to update{" "}
              <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                {formData.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              Your changes will be saved immediately.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={() => setIsOpen(false)}
                isDisabled={updating}
                className="dark:border-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </Button>

              <Button
                color="primary"
                onPress={handleUpdate}
                isDisabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}