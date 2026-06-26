"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Table } from "@heroui/react";

export default function AdminUsersPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;
  // const userId = user?.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
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

        // const res = await fetch(`${API_URL}/api/users`);
        const res = await fetch(`${API_URL}/api/users`, {
          headers: {
            "x-user-id": user.id,
          },
        });

       
        
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL, user, role, isPending, router]);

  const handleBlockToggle = async (targetUser) => {
    const nextStatus = targetUser.status === "blocked" ? "active" : "blocked";

    const confirmAction = window.confirm(
      `Are you sure you want to ${
        nextStatus === "blocked" ? "block" : "unblock"
      } this user?`,
    );

    if (!confirmAction) return;

    setActionLoadingId(targetUser._id);

    try {
      const res = await fetch(`${API_URL}/api/users/${targetUser._id}/block`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update user status");
        return;
      }

      setUsers((prev) =>
        prev.map((item) =>
          item._id === targetUser._id ? { ...item, status: nextStatus } : item,
        ),
      );

      alert(data.message);
    } catch (error) {
      console.error("Block toggle error:", error);
      alert("Something went wrong.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRoleChange = async (targetUser, newRole) => {
    const confirmAction = window.confirm(
      `Are you sure you want to change this user's role to ${newRole}?`,
    );

    if (!confirmAction) return;

    setActionLoadingId(targetUser._id);

    try {
      const res = await fetch(`${API_URL}/api/users/${targetUser._id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: newRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update user role");
        return;
      }

      setUsers((prev) =>
        prev.map((item) =>
          item._id === targetUser._id ? { ...item, role: newRole } : item,
        ),
      );

      alert(data.message);
    } catch (error) {
      console.error("Role update error:", error);
      alert("Something went wrong.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-white/40 bg-white/30 px-6 py-4 font-semibold text-[#2F3A2F] shadow-xl backdrop-blur-md animate-pulse">
          Loading users directory...
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6 py-20">
        <section className="max-w-md w-full rounded-[32px] border border-white/40 bg-white/30 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-black text-[#2F3A2F]">Access Denied</h1>
          <p className="mt-3 font-medium text-[#5D6B57]">
            Only admins can manage users.
          </p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="rounded-2xl border border-red-200/50 bg-red-50/40 px-6 py-4 font-semibold text-red-700 shadow-xl backdrop-blur-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-4 py-12 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <section className="relative z-10 mx-auto max-w-7xl rounded-[32px] border border-white/40 bg-white/20 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] backdrop-blur-xl">
        {/* Header Block */}
        <div className="mb-8 border-b border-white/20 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5D6B57] bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
            Control Panel
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2F3A2F] mt-3 tracking-tight">
            User Management
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5D6B57]/90 font-medium">
            View active accounts, block/unblock validations, and reassign system
            roles instantly.
          </p>
        </div>

        {/* HeroUI Table Container */}
        <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-inner backdrop-blur-md">
          <Table
            className="text-[#2F3A2F] bg-transparent shadow-none"
            style={{ background: "transparent" }}
          >
            <Table.ScrollContainer>
              <Table.Content aria-label="User Management Table">
                <Table.Header className="bg-white/15 border-b border-white/30">
                  {/* ADDED isRowHeader TO COMPLY WITH ACCESSIBILITY ERROR REQUIREMENTS */}
                  <Table.Column allowsSorting isRowHeader>
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader
                        sortDirection={sortDirection}
                        className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4"
                      >
                        User / ID
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4">
                    Email
                  </Table.Column>
                  <Table.Column className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4">
                    System Role
                  </Table.Column>
                  <Table.Column className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4">
                    Current Plan
                  </Table.Column>
                  <Table.Column className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4">
                    Status
                  </Table.Column>
                  <Table.Column className="text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80 p-4 text-right">
                    Management Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {users.map((item) => {
                    const status = item.status || "active";
                    const itemRole = item.role || "member";
                    const isActionLoading = actionLoadingId === item._id;

                    return (
                      <Table.Row
                        key={item._id}
                        className={`border-b border-white/15 last:border-0 transition-all duration-200 hover:bg-white/5 ${
                          isActionLoading
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        {/* User / ID Cell */}
                        <Table.Cell className="p-4">
                          <p className="font-bold text-base text-[#2F3A2F] truncate">
                            {item.name || "Unnamed User"}
                          </p>
                          <p className="text-[10px] font-mono text-[#5D6B57]/80 truncate mt-0.5">
                            ID: {item._id}
                          </p>
                        </Table.Cell>

                        {/* Email Cell */}
                        <Table.Cell className="p-4">
                          <p className="text-sm font-medium text-[#4B5A42] truncate">
                            {item.email}
                          </p>
                        </Table.Cell>

                        {/* System Role Cell */}
                        <Table.Cell className="p-4">
                          <span className="inline-block rounded-xl border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold capitalize text-[#4B5A42] backdrop-blur-sm shadow-sm">
                            {itemRole}
                          </span>
                        </Table.Cell>

                        {/* Current Plan Cell */}
                        <Table.Cell className="p-4">
                          <span className="inline-block rounded-xl border border-white/40 bg-white/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5D6B57] shadow-sm">
                            {item.plan || "free"}
                          </span>
                        </Table.Cell>

                        {/* Status Cell */}
                        <Table.Cell className="p-4">
                          <span
                            className={`inline-block rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm border ${
                              status === "blocked"
                                ? "bg-red-500/10 border-red-500/20 text-red-700"
                                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                            }`}
                          >
                            {status}
                          </span>
                        </Table.Cell>

                        {/* Actions Cell */}
                        <Table.Cell className="p-4 text-right">
                          <div className="flex flex-wrap gap-2 justify-end">
                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() => handleBlockToggle(item)}
                              className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide text-white transition-all shadow-sm active:scale-[0.97] disabled:opacity-40 ${
                                status === "blocked"
                                  ? "bg-[#6B8E23] hover:bg-[#6B8E23]/90"
                                  : "bg-red-600 hover:bg-red-700"
                              }`}
                            >
                              {status === "blocked"
                                ? "Unblock Account"
                                : "Block Account"}
                            </button>

                            {itemRole !== "admin" && (
                              <button
                                type="button"
                                disabled={isActionLoading}
                                onClick={() => handleRoleChange(item, "admin")}
                                className="rounded-xl bg-[#2F3A2F] px-4 py-2 text-xs font-bold tracking-wide text-[#EDF3E7] shadow-sm transition-all hover:bg-[#2F3A2F]/90 active:scale-[0.97] disabled:opacity-40"
                              >
                                Make Admin
                              </button>
                            )}

                            {itemRole === "trainer" && (
                              <button
                                type="button"
                                disabled={isActionLoading}
                                onClick={() => handleRoleChange(item, "member")}
                                className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-sm transition-all hover:bg-amber-700 active:scale-[0.97] disabled:opacity-40"
                              >
                                Demote to Member
                              </button>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
              {users.length === 0 && (
                <div className="p-8 text-center text-sm font-medium text-[#5D6B57]">
                  No accounts found inside the system index.
                </div>
              )}
            </Table.Footer>
          </Table>
        </div>
      </section>
    </main>
  );
}
