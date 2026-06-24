"use client";

import React, { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import Link from "next/link";

export default function ClassesPreview() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/classes?limit=3");

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await res.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <section className="px-30 py-20">
        <p className="text-center text-lg">Loading classes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-30 py-20">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="px-30 py-20 bg-[#e9f0e4]/40 backdrop-blur-xl border border-[#c7d6b8]/40 shadow-lg">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold text-[#2F3A2F]">
            Popular Classes
          </h2>

          <p className="mt-2 text-[#5D6B57]">
            Join expertly designed training sessions
          </p>
        </div>

        <Link href="/allclasses" className="hidden md:block px-5 py-3 rounded-full border border-[#A3B18A]">
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}