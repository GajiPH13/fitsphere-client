
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function TrainerApplicationsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
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

        const res = await fetch(`${API_URL}/api/trainer-applications`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch trainer applications");
        }

        setApplications(Array.isArray(data) ? data : data.applications || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch trainer applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [API_URL, user, role, isPending, router]);

  const openStatusModal = (application, status) => {
    setSelectedApplication(application);
    setSelectedStatus(status);
    setIsOpen(true);
  };

  const closeStatusModal = () => {
    setSelectedApplication(null);
    setSelectedStatus("");
    setIsOpen(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedApplication?._id || !selectedStatus) {
      toast.error("No application selected.");
      return;
    }

    if (!user?.id) {
      toast.error("Unauthorized. User ID is missing.");
      return;
    }

    setActionLoadingId(selectedApplication._id);

    const updatePromise = async () => {
      const res = await fetch(
        `${API_URL}/api/trainer-applications/${selectedApplication._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({
            status: selectedStatus,
            userId: selectedApplication.userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update application status");
      }

      setApplications((prev) =>
        prev.map((item) =>
          item._id === selectedApplication._id
            ? {
                ...item,
                status: selectedStatus,
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );

      closeStatusModal();

      return data.message || "Application updated successfully";
    };

    try {
      await toast.promise(updatePromise(), {
        loading: "Updating application...",
        success: (message) => message,
        error: (err) => err.message || "Something went wrong.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 transition-colors">
        <p className="text-center text-[#2F3A2F] dark:text-zinc-400">
          Loading trainer applications...
        </p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 px-6 py-20 text-center transition-colors">
        <h1 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-100">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57] dark:text-zinc-400">
          Only admins can review trainer applications.
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
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F] dark:text-zinc-100">
            Trainer Applications
          </h1>
          <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
            Review, approve, or reject member requests to become trainers.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-[32px] border border-white/40 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-900/70 p-10 text-center shadow-xl backdrop-blur-2xl">
            <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">
              No applications found
            </h2>
            <p className="mt-2 text-[#5D6B57] dark:text-zinc-400">
              Trainer applications will appear here when members apply.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {applications.map((application) => (
              <article
                key={application._id}
                className="rounded-[32px] border border-white/40 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-900/70 p-6 shadow-xl backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-[#A3B18A]/40 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                    {application.image ? (
                      <Image
                        src={application.image}
                        alt={application.userName || "Applicant"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#DDE5D0] dark:bg-zinc-800 text-4xl font-bold text-[#556B2F] dark:text-zinc-300">
                        {application.userName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-[#2F3A2F] dark:text-zinc-100">
                          {application.userName}
                        </h2>
                        <p className="text-sm text-[#5D6B57] dark:text-zinc-400">
                          {application.userEmail}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${
                          application.status === "pending"
                            ? "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400"
                            : application.status === "approved"
                              ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-[#4B5A42] dark:text-zinc-300">
                      <p>
                        <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                          Experience:
                        </span>{" "}
                        {application.experience}
                      </p>

                      <p>
                        <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                          Skills:
                        </span>{" "}
                        {application.skills}
                      </p>

                      <p>
                        <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                          Certification:
                        </span>{" "}
                        {application.certification}
                      </p>

                      <p className="leading-6">
                        <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">Bio:</span>{" "}
                        {application.bio}
                      </p>

                      <p className="text-xs text-[#5D6B57] dark:text-zinc-400">
                        Applied:{" "}
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleString()
                          : "No date"}
                      </p>
                    </div>

                    {application.status === "pending" && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={actionLoadingId === application._id}
                          onClick={() =>
                            openStatusModal(application, "approved")
                          }
                          className="rounded-full bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-zinc-700"
                        >
                          {actionLoadingId === application._id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          disabled={actionLoadingId === application._id}
                          onClick={() =>
                            openStatusModal(application, "rejected")
                          }
                          className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-zinc-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-transparent dark:border-zinc-800">
            <h2
              className={`text-2xl font-black ${
                selectedStatus === "approved"
                  ? "text-[#2F3A2F] dark:text-zinc-100"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {selectedStatus === "approved"
                ? "Approve Application"
                : "Reject Application"}
            </h2>

            <p className="mt-4 text-[#4B5A42] dark:text-zinc-300">
              Are you sure you want to {selectedStatus}{" "}
              <span className="font-bold text-[#2F3A2F] dark:text-zinc-100">
                {selectedApplication?.userName}
              </span>
              's trainer application?
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              This action will update the application status immediately.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={closeStatusModal}
                isDisabled={Boolean(actionLoadingId)}
                className="dark:border-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </Button>

              <Button
                color={selectedStatus === "approved" ? "primary" : "danger"}
                onPress={handleStatusUpdate}
                isDisabled={Boolean(actionLoadingId)}
              >
                {actionLoadingId
                  ? "Processing..."
                  : selectedStatus === "approved"
                    ? "Approve"
                    : "Reject"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}