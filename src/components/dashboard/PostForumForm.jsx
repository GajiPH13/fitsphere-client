"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function CreateForumPostPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  const isAllowed = role === "trainer" || role === "admin";

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    shortDescription: "",
    content: "",
    category: "Fitness Tips",
    status: "published",
  });

  if (isPending) {
    return <p className="p-10 text-center">Checking permission...</p>;
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only trainers and admins can create forum posts.
        </p>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ImgBB Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);

    try {
      // Replace with your actual ImgBB API key or process.env configuration variable
    //   const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY"; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: bodyFormData,
      });
      const data = await response.json();
      
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      alert("Something went wrong during image upload.");
    } finally {
      setUploadingImage(false);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const postData = {
        title: formData.title,
        image: formData.image,
        shortDescription: formData.shortDescription,
        content: formData.content,
        category: formData.category,
        status: formData.status,
        authorName: user.name,
        authorRole: role,
        authorId: user.id,
      };

      const res = await fetch(`${API_URL}/api/forum-posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create post");
        return;
      }
      
      alert("Forum post created successfully!");
      router.push("/forum");
    } catch (error) {
      console.error("Create forum post error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F2F6EF] via-[#EDF3E7] to-[#DFE9D7] px-4 py-12 sm:px-6 md:px-16 lg:px-24">
      <section className="mx-auto max-w-3xl rounded-[32px] border border-white/40 bg-white/40 p-6 shadow-[0_22px_70px_rgba(47,58,47,0.08)] backdrop-blur-xl sm:p-10 md:p-12">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block rounded-full bg-[#8B9E7A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5D6B57]">
            Hub Creator
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#2F3A2F] sm:text-4xl">
            Create Forum Post
          </h1>
          <p className="mt-2 text-sm text-[#5D6B57]/90 sm:text-base">
            Share fitness knowledge with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., 5 Advanced Core Progressions"
              required
              className="w-full rounded-2xl border border-[#CAD2C5] bg-white/60 p-4 text-[#2F3A2F] placeholder-[#A3B18A] transition-all outline-none focus:border-[#8B9E7A] focus:bg-white focus:ring-4 focus:ring-[#8B9E7A]/10"
            />
          </div>

          {/* ImgBB Image Drag/Drop & Preview Area */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Cover Image</label>
            
            {!formData.image ? (
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CAD2C5] bg-white/40 py-8 px-4 text-center transition-all hover:bg-white/60">
                {uploadingImage ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8B9E7A] border-t-transparent"></div>
                    <p className="text-sm font-medium text-[#5D6B57]">Uploading to ImgBB...</p>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-10 w-10 text-[#8B9E7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="mt-4 flex text-sm text-[#5D6B57]">
                      <label className="relative cursor-pointer rounded-md font-semibold text-[#4A5D4E] underline decoration-[#8B9E7A] decoration-2 underline-offset-4 hover:text-[#2F3A2F]">
                        <span>Upload a file</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="mt-1 text-xs text-[#A3B18A]">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            ) : (
              /* Image Preview Card using Next.js Image */
              <div className="group relative h-56 w-full overflow-hidden rounded-2xl border border-[#CAD2C5] bg-white/50">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-4 right-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-110"
                  title="Remove Image"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-[#2F3A2F] backdrop-blur-sm">
                  Image Ready
                </div>
              </div>
            )}
            {/* Hidden Input preserving original state bind functionality */}
            <input type="hidden" name="image" value={formData.image} required />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Short Summary</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Catchy sentence summarizing your main points..."
              rows="2"
              required
              className="w-full resize-none rounded-2xl border border-[#CAD2C5] bg-white/60 p-4 text-[#2F3A2F] placeholder-[#A3B18A] transition-all outline-none focus:border-[#8B9E7A] focus:bg-white focus:ring-4 focus:ring-[#8B9E7A]/10"
            />
          </div>

          {/* Full Content */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Full Article Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Go deep into the details here..."
              rows="6"
              required
              className="w-full rounded-2xl border border-[#CAD2C5] bg-white/60 p-4 text-[#2F3A2F] placeholder-[#A3B18A] transition-all outline-none focus:border-[#8B9E7A] focus:bg-white focus:ring-4 focus:ring-[#8B9E7A]/10"
            />
          </div>

          {/* Configuration Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Topic Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-[#CAD2C5] bg-white/60 p-4 pr-10 text-[#2F3A2F] transition-all outline-none focus:border-[#8B9E7A] focus:bg-white focus:ring-4 focus:ring-[#8B9E7A]/10"
                >
                  <option>Fitness Tips</option>
                  <option>Nutrition</option>
                  <option>Yoga</option>
                  <option>Strength Training</option>
                  <option>Recovery</option>
                  <option>Mindset</option>
                  <option>Workout Planning</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#5D6B57]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide text-[#4A5D4E] uppercase">Visibility Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-[#CAD2C5] bg-white/60 p-4 pr-10 text-[#2F3A2F] transition-all outline-none focus:border-[#8B9E7A] focus:bg-white focus:ring-4 focus:ring-[#8B9E7A]/10"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#5D6B57]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="group relative flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#5D6B57] to-[#4A5D4E] py-4 px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#4A5D4E] hover:to-[#2F3A2F] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Publishing Post...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Create Forum Post</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}