
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {  Button } from "@heroui/react";

export default function AdminClassesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusUpdate = async (classId, status) => {
    if (!user?.id) {
      toast.error("Unauthorized. User ID is missing.");
      return;
    }

    const updatePromise = async () => {
      const res = await fetch(`${API_URL}/api/classes/${classId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update class status");
      }

      setClasses((prev) =>
        prev.map((item) => (item._id === classId ? { ...item, status } : item)),
      );

      return data.message || `Class ${status} successfully`;
    };

    toast.promise(updatePromise(), {
      loading: `Updating class to ${status}...`,
      success: (message) => message,
      error: (err) => err.message || "Something went wrong.",
    });
  };

  const handleDeleteClass = async () => {
    if (!selectedClass?._id) {
      toast.error("No class selected.");
      return;
    }

    if (!user?.id) {
      toast.error("Unauthorized. User ID is missing.");
      return;
    }

    setDeleteLoading(true);

    const deletePromise = async () => {
      const res = await fetch(`${API_URL}/api/classes/${selectedClass._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete class");
      }

      setClasses((prev) =>
        prev.filter((item) => item._id !== selectedClass._id),
      );

      setIsOpen(false);
      setSelectedClass(null);

      return "Class deleted successfully";
    };

    try {
      await toast.promise(deletePromise(), {
        loading: "Deleting class...",
        success: (message) => message,
        error: (err) =>
          err.message || "Something went wrong while deleting class",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      if (isPending) return;

      if (!user) {
        router.replace("/auth/signin");
        return;
      }

      if (role !== "admin") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/admin/classes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await res.json();
        setClasses(Array.isArray(data) ? data : data.classes || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [API_URL, user, role, isPending, router]);

  if (isPending || loading) {
    return <p className="p-10 text-center">Loading classes...</p>;
  }

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">Only admins can manage classes.</p>
      </main>
    );
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-7xl rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F]">
            Class Management
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            Review, approve, reject, or delete fitness classes.
          </p>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-3xl border border-[#A3B18A]/40 bg-white/60 p-10 text-center">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">
              No classes found
            </h2>
            <p className="mt-2 text-[#5D6B57]">
              Classes will appear here after trainers create them.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {classes.map((item) => (
              <article
                key={item._id}
                className="grid gap-5 rounded-[28px] border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl md:grid-cols-[180px_1fr_auto]"
              >
                <div className="relative h-36 overflow-hidden rounded-3xl bg-[#DDE5D0]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#556B2F]">
                      No Image
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status || "pending"}
                    </span>

                    <span className="rounded-full bg-[#DDE5D0] px-3 py-1 text-xs font-bold text-[#556B2F]">
                      {item.category || "General"}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#5D6B57]">
                      {item.level}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-[#2F3A2F]">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#5D6B57]">
                    Trainer: {item.trainer || item.trainerName || "Unknown"}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4B5A42]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[#5D6B57]">
                    <span>Duration: {item.duration}</span>
                    <span>Capacity: {item.capacity}</span>
                    <span>Price: ${item.price || 0}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 md:flex-col md:justify-center">
                  <button
                    onClick={() => handleStatusUpdate(item._id, "approved")}
                    type="button"
                    className="rounded-full bg-[#6B8E23] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(item._id, "rejected")}
                    type="button"
                    className="rounded-full bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      setSelectedClass(item);
                      setIsOpen(true);
                    }}
                    type="button"
                    className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
     {isOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <h2 className="text-2xl font-black text-red-600">Delete Class</h2>

      <p className="mt-4 text-[#4B5A42]">
        Are you sure you want to delete{" "}
        <span className="font-bold text-[#2F3A2F]">
          {selectedClass?.title}
        </span>
        ?
      </p>

      <p className="mt-2 text-sm text-gray-500">
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="bordered"
          onPress={() => {
            setIsOpen(false);
            setSelectedClass(null);
          }}
          isDisabled={deleteLoading}
        >
          Cancel
        </Button>

        <Button
          color="danger"
          onPress={handleDeleteClass}
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
