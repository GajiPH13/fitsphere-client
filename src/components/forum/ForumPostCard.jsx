"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function ForumPostCard({ post }) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[32px]
        border border-white/40
        bg-white/60
        backdrop-blur-2xl
        shadow-xl
        transition-all duration-500
        hover:-translate-y-2
      "
    >
      {/* Post Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Author Badge */}
        <div className="flex items-center justify-between">
          <span
            className="
              rounded-full
              bg-[#DDE5D0]
              px-3 py-1
              text-xs
              font-semibold
              text-[#556B2F]
              capitalize
            "
          >
            {post.authorRole}
          </span>

          <span className="text-xs text-[#5D6B57]">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h2
          className="
            mt-4
            text-2xl
            font-(--font-plus-jakarta)
            font-weight-bold
            text-[#2F3A2F]
            line-clamp-2
          "
        >
          {post.title}
        </h2>

        {/* Author */}
        <p className="mt-2 text-sm text-[#5D6B57]">By {post.authorName}</p>

        {/* Description */}
        <p
          className="
            mt-4
            text-sm
            leading-7
            text-[#4B5A42]
            line-clamp-3
          "
        >
          {post.shortDescription}
        </p>

        {/* CTA */}
        <Link
    href={`/forum/${post._id}`}
    className="
      w-full
      group
      inline-flex
      h-14
      items-center
      justify-center
      gap-3
      rounded-full
      bg-linear-to-r
      from-[#6B8E23]
      to-[#5A7A1E]
      px-8
      font-(--font-plus-jakarta)
      font-weight-bold
      text-white
      shadow-xl
      shadow-[#6B8E23]/20
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:opacity-95
      hover:shadow-2xl
      hover:shadow-[#6B8E23]/30
      active:scale-[0.98]
    "
  >
    Read More
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Link>
      </div>
    </article>
  );
}
