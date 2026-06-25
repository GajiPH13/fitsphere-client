"use client";

import Image from "next/image";
import Link from "next/link";

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
            font-bold
            text-[#2F3A2F]
            line-clamp-2
          "
        >
          {post.title}
        </h2>

        {/* Author */}
        <p className="mt-2 text-sm text-[#5D6B57]">
          By {post.authorName}
        </p>

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
          type="button"
          href={`/forum/${post._id}`}
          className="
            mt-6
            outline
            inline-flex
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#6B8E23]
            px-5
            py-3
            font-semibold
            text-[#2F3A2F]
            transition
            hover:brightness-110
          "
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}