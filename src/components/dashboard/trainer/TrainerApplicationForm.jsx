"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ApplyTrainerPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const user = session?.user;
  const role = user?.role;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    experience: "",
    skills: "",
    certification: "",
    bio: "",
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <p className="rounded-2xl border border-white/40 bg-white/30 px-6 py-4 font-medium text-[#2F3A2F] shadow-lg backdrop-blur-md animate-pulse">
          Checking user credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  if (role !== "member") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6 py-20">
        <section className="max-w-md w-full rounded-[32px] border border-white/40 bg-white/30 p-8 text-center shadow-xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-3 text-[#5D6B57]">
            Only members can apply to become trainers.
          </p>
        </section>
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

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    if (!IMGBB_API_KEY) {
      alert("ImgBB API key is missing.");
      return;
    }

    const imageData = new FormData();
    imageData.append("image", imageFile);

    setUploading(true);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert("Image upload failed.");
        return;
      }

      setImageUrl(data.data.url);
      alert("Image uploaded successfully.");
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Something went wrong while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload your profile/certification image.");
      return;
    }

    setLoading(true);

    try {
      const applicationData = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        image: imageUrl,
        experience: formData.experience,
        skills: formData.skills,
        certification: formData.certification,
        bio: formData.bio,
        status: "pending",
      };

      const res = await fetch(`${API_URL}/api/trainer-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to submit application.");
        return;
      }

      alert("Trainer application submitted successfully!");
      router.push("/dashboard/member");
    } catch (error) {
      console.error("Trainer application error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-4 py-12 sm:px-6 md:px-12 lg:px-20 flex items-center justify-center relative overflow-hidden">
      {/* Dynamic ambient background blobs for glassmorphic depth */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />

      <section className="relative z-10 w-full max-w-5xl rounded-[32px] border border-white/40 bg-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT SIDE: Heading & Member Info */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/20 bg-white/5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5D6B57] bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
              Join Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2F3A2F] mt-4 leading-tight">
              Apply to Become a Trainer
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#5D6B57]/90 font-medium">
              Share your experience, specialties, and official certifications directly with our administration panel.
            </p>
          </div>

          <div className="mt-10 lg:mt-0 rounded-2xl border border-white/30 bg-white/10 p-5 backdrop-blur-md shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#2F3A2F]/60">
              Applicant Profile
            </p>
            <div className="mt-3 flex items-center gap-4">
              {/* Optional user avatar element or fallback circle placeholder */}
              <div className="h-12 w-12 rounded-full bg-[#2F3A2F]/10 flex items-center justify-center font-bold text-[#2F3A2F] border border-white/40 text-lg shadow-inner">
                {user.name ? user.name.charAt(0).toUpperCase() : "M"}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-base text-[#2F3A2F] truncate">{user.name}</p>
                <p className="text-xs text-[#5D6B57] font-medium truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Application Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Image Input Zone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#2F3A2F]">
                Upload Verification Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-[#2F3A2F] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#2F3A2F] file:text-[#EDF3E7] hover:file:opacity-90 file:transition-all file:cursor-pointer p-2 rounded-2xl border border-white/40 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5D6B57]/20"
              />

              {uploading && (
                <div className="flex items-center gap-2 mt-2 px-1">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#5D6B57] border-t-transparent" />
                  <p className="text-xs font-medium text-[#5D6B57]">Uploading attachment...</p>
                </div>
              )}

              {/* Preview block aligned seamlessly under file selector */}
              {imageUrl && (
                <div className="mt-3 inline-block rounded-2xl border border-white/50 bg-white/10 p-2 shadow-sm backdrop-blur-md">
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl">
                    <Image
                      src={imageUrl}
                      alt="Uploaded preview"
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-center mt-1 font-bold text-[#2F3A2F]/70">Uploaded Image</p>
                </div>
              )}
            </div>

            {/* Input fields collection */}
            <div className="space-y-3">
              <input
                name="experience"
                type="text"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience, e.g. 3 years as a fitness coach"
                required
                className="w-full rounded-xl border border-white/40 bg-white/10 p-3.5 text-sm text-[#2F3A2F] placeholder-[#5D6B57]/60 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/20 focus:ring-4 focus:ring-white/5"
              />

              <input
                name="skills"
                type="text"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills, e.g. Yoga, HIIT, Strength Training"
                required
                className="w-full rounded-xl border border-white/40 bg-white/10 p-3.5 text-sm text-[#2F3A2F] placeholder-[#5D6B57]/60 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/20 focus:ring-4 focus:ring-white/5"
              />

              <input
                name="certification"
                type="text"
                value={formData.certification}
                onChange={handleChange}
                placeholder="Certification, e.g. ACE Certified Personal Trainer"
                required
                className="w-full rounded-xl border border-white/40 bg-white/10 p-3.5 text-sm text-[#2F3A2F] placeholder-[#5D6B57]/60 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/20 focus:ring-4 focus:ring-white/5"
              />

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself..."
                rows="4"
                required
                className="w-full rounded-xl border border-white/40 bg-white/10 p-3.5 text-sm text-[#2F3A2F] placeholder-[#5D6B57]/60 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/20 focus:ring-4 focus:ring-white/5 resize-none"
              />
            </div>

            {/* Action element */}
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full rounded-xl bg-[#2F3A2F] py-3.5 text-sm font-semibold text-[#EDF3E7] shadow-md transition-all hover:bg-[#2F3A2F]/90 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-40 disabled:scale-100 mt-2"
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>
        </div>

      </section>
    </main>
  );
}