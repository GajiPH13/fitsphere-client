"use client";

import React, { useState } from "react";

export default function TrainerApplicationForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "profile") {
      setImagePreview(preview);
    } else {
      setCertificatePreview(preview);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log("Trainer Application Submitted");
  };

  return (
    <section className="min-h-screen bg-[#EDF3E7] px-6 py-10 md:px-16">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2F3A2F]">
            Apply as Trainer
          </h1>
          <p className="mt-3 text-[#5D6B57]">
            Submit your professional information for admin approval.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-[#2F3A2F]">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="name"
                placeholder="Full Name"
                className="rounded-2xl border p-4"
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="rounded-2xl border p-4"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-2xl border p-4"
                required
              />

              <input
                name="age"
                type="number"
                placeholder="Age"
                className="rounded-2xl border p-4"
                required
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-3 block font-medium">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "profile")}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-28 w-28 rounded-full object-cover"
              />
            )}
          </div>

          {/* Professional Info */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-[#2F3A2F]">
              Professional Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="experience"
                type="number"
                placeholder="Years of Experience"
                className="rounded-2xl border p-4"
                required
              />

              <select
                name="specialization"
                className="rounded-2xl border p-4"
                required
              >
                <option value="">Select Specialization</option>
                <option>Yoga</option>
                <option>Strength Training</option>
                <option>HIIT</option>
                <option>CrossFit</option>
                <option>Cardio</option>
                <option>Pilates</option>
              </select>
            </div>
          </div>

          {/* Certification */}
          <div>
            <label className="mb-3 block font-medium">
              Upload Certification
            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleImageUpload(e, "certificate")}
            />

            {certificatePreview && (
              <img
                src={certificatePreview}
                alt="Certificate Preview"
                className="mt-4 h-40 rounded-2xl object-cover"
              />
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="mb-3 block font-medium">
              Professional Bio
            </label>

            <textarea
              name="bio"
              rows="5"
              placeholder="Tell us about your fitness journey, certifications, achievements..."
              className="w-full rounded-2xl border p-4"
              required
            />
          </div>

          {/* Social */}
          <div>
            <label className="mb-3 block font-medium">
              Portfolio / Social Link (Optional)
            </label>

            <input
              name="social"
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full rounded-2xl border p-4"
            />
          </div>

          {/* Terms */}
          <label className="flex items-center gap-3">
            <input type="checkbox" required />
            <span className="text-sm text-[#5D6B57]">
              I confirm all submitted information is accurate.
            </span>
          </label>

          {/* CTA */}
          <button className="w-full rounded-full bg-[#6B8E23] py-4 text-lg font-semibold text-white transition hover:brightness-110">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}