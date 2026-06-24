"use client";

import React from "react";
import { Star, Clock, Persons, Heart } from "@gravity-ui/icons";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function ClassCard({ item }) {
  const { data: session } = useSession();
  const detailsLink = session?.user
    ? `/allclasses/${item._id}`
    : "/auth/signin";
  // const user = session?.user;
  return (
    <div className="group relative w-full max-w-[420px] rounded-[32px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:-translate-y-3">
      {/* Image Section */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Level Badge */}
        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-sm font-medium text-[#556B2F]">
          {item.level}
        </div>

        {/* Wishlist */}
        <div className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 flex items-center justify-center">
          <Heart className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-10 mx-3 rounded-[30px] bg-white/75 backdrop-blur-2xl border border-white/50 p-6 z-10">
        <h3 className="text-2xl font-bold text-[#1F2A1F]">{item.title}</h3>

        <p className="mt-2 text-lg text-[#4B5A42]">
          with {item.trainer || item.trainerName}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {item.description?.length > 100
            ? `${item.description.substring(0, 100)}...`
            : item.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="text-[#6B8E23]" />
            </div>
            <p className="font-semibold">{item.duration}</p>
            <p className="text-xs text-gray-500 mt-1">Duration</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Persons className="text-[#6B8E23]" />
            </div>
            <p className="font-semibold">{item.capacity}</p>
            <p className="text-xs text-gray-500 mt-1">Total Spots</p>
          </div>

          <div className="rounded-2xl bg-white/70 p-4 text-center">
            <div className="flex justify-center mb-2">
              <Star className="text-[#D4A017]" />
            </div>
            <p className="font-semibold">{item.rating}</p>
            <p className="text-xs text-gray-500 mt-1">Rating</p>
          </div>
        </div>

        {/* <button className="mt-6 w-full py-4 rounded-full
         bg-[#6B8E23] text-white text-lg font-semibold shadow-lg transition
          hover:brightness-110">
          Join Class →
        </button> */}
        <Link
          type="Button"
          href={detailsLink}
          className="mt-6 block text-center w-full py-4 rounded-full
         !bg-[#6B8E23] text-white text-lg font-semibold shadow-lg transition
          hover:brightness-110"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
