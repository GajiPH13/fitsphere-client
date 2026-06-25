"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  useEffect(() => {
    const fetchApplications = async () => {
      if (isPending) return;

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      if (role !== "admin") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/trainer-applications`);

        if (!res.ok) {
          throw new Error("Failed to fetch trainer applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [API_URL, user, role, isPending, router]);

  const handleStatusUpdate = async (application, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status} this application?`
    );

    if (!confirmAction) return;

    setActionLoadingId(application._id);

    try {
      const res = await fetch(
        `${API_URL}/api/trainer-applications/${application._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            userId: application.userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update application status");
        return;
      }

      setApplications((prev) =>
        prev.map((item) =>
          item._id === application._id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item
        )
      );

      alert(data.message || "Application updated successfully");
    } catch (error) {
      console.error("Application status update error:", error);
      alert("Something went wrong.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20">
        <p className="text-center text-[#2F3A2F]">
          Loading trainer applications...
        </p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2F3A2F]">Access Denied</h1>
        <p className="mt-3 text-[#5D6B57]">
          Only admins can review trainer applications.
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#EDF3E7] px-6 py-20 text-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12 md:px-16 lg:px-24">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2F3A2F]">
            Trainer Applications
          </h1>
          <p className="mt-2 text-[#5D6B57]">
            Review, approve, or reject member requests to become trainers.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-[32px] border border-white/40 bg-white/70 p-10 text-center shadow-xl backdrop-blur-2xl">
            <h2 className="text-2xl font-bold text-[#2F3A2F]">
              No applications found
            </h2>
            <p className="mt-2 text-[#5D6B57]">
              Trainer applications will appear here when members apply.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {applications.map((application) => (
              <article
                key={application._id}
                className="rounded-[32px] border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-[#A3B18A]/40 bg-white">
                    {application.image ? (
                      <Image
                        src={application.image}
                        alt={application.userName || "Applicant"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#DDE5D0] text-4xl font-bold text-[#556B2F]">
                        {application.userName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-[#2F3A2F]">
                          {application.userName}
                        </h2>
                        <p className="text-sm text-[#5D6B57]">
                          {application.userEmail}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${
                          application.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : application.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-[#4B5A42]">
                      <p>
                        <span className="font-bold text-[#2F3A2F]">
                          Experience:
                        </span>{" "}
                        {application.experience}
                      </p>

                      <p>
                        <span className="font-bold text-[#2F3A2F]">
                          Skills:
                        </span>{" "}
                        {application.skills}
                      </p>

                      <p>
                        <span className="font-bold text-[#2F3A2F]">
                          Certification:
                        </span>{" "}
                        {application.certification}
                      </p>

                      <p className="leading-6">
                        <span className="font-bold text-[#2F3A2F]">Bio:</span>{" "}
                        {application.bio}
                      </p>

                      <p className="text-xs text-[#5D6B57]">
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
                            handleStatusUpdate(application, "approved")
                          }
                          className="rounded-full bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                          {actionLoadingId === application._id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          disabled={actionLoadingId === application._id}
                          onClick={() =>
                            handleStatusUpdate(application, "rejected")
                          }
                          className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
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
    </main>
  );
}