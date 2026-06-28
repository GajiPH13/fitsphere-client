
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Table, Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const user = session?.user;
  const role = user?.role;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
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

        const res = await fetch(`${API_URL}/api/users`, {
          headers: {
            "x-user-id": user.id,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL, user, role, isPending, router]);

  const openBlockModal = (targetUser) => {
    const nextStatus = targetUser.status === "blocked" ? "active" : "blocked";

    setConfirmAction({
      type: "status",
      targetUser,
      nextStatus,
      title: nextStatus === "blocked" ? "Block User" : "Unblock User",
      message: `Are you sure you want to ${
        nextStatus === "blocked" ? "block" : "unblock"
      } ${targetUser.name || targetUser.email}?`,
      confirmText: nextStatus === "blocked" ? "Block" : "Unblock",
    });

    setConfirmOpen(true);
  };

  const openRoleModal = (targetUser, newRole) => {
    setConfirmAction({
      type: "role",
      targetUser,
      newRole,
      title: "Change User Role",
      message: `Are you sure you want to change ${
        targetUser.name || targetUser.email
      }'s role to ${newRole}?`,
      confirmText: "Change Role",
    });

    setConfirmOpen(true);
  };

  const closeModal = () => {
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction?.targetUser?._id) {
      toast.error("No user selected.");
      return;
    }

    if (!user?.id) {
      toast.error("Unauthorized. Admin user ID is missing.");
      return;
    }

    const targetUser = confirmAction.targetUser;
    setActionLoadingId(targetUser._id);

    if (confirmAction.type === "status") {
      const updatePromise = async () => {
        const res = await fetch(`${API_URL}/api/users/${targetUser._id}/block`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({
            status: confirmAction.nextStatus,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to update user status");
        }

        setUsers((prev) =>
          prev.map((item) =>
            item._id === targetUser._id
              ? { ...item, status: confirmAction.nextStatus }
              : item
          )
        );

        closeModal();
        return data.message || "User status updated successfully";
      };

      try {
        await toast.promise(updatePromise(), {
          loading: "Updating user status...",
          success: (message) => message,
          error: (err) => err.message || "Failed to update user status",
        });
      } finally {
        setActionLoadingId(null);
      }

      return;
    }

    if (confirmAction.type === "role") {
      const updatePromise = async () => {
        const res = await fetch(`${API_URL}/api/users/${targetUser._id}/role`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({
            role: confirmAction.newRole,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to update user role");
        }

        setUsers((prev) =>
          prev.map((item) =>
            item._id === targetUser._id
              ? { ...item, role: confirmAction.newRole }
              : item
          )
        );

        closeModal();
        return data.message || "User role updated successfully";
      };

      try {
        await toast.promise(updatePromise(), {
          loading: "Updating user role...",
          success: (message) => message,
          error: (err) => err.message || "Failed to update user role",
        });
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="animate-pulse rounded-2xl border border-white/40 bg-white/30 px-6 py-4 font-semibold text-[#2F3A2F] shadow-xl backdrop-blur-md">
          Loading users directory...
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6 py-20">
        <section className="w-full max-w-md rounded-[32px] border border-white/40 bg-white/30 p-8 text-center shadow-2xl backdrop-blur-xl">
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
    <main className="relative min-h-screen overflow-hidden bg-[#EDF3E7] px-2 py-12 sm:px-4 md:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-[1600px] rounded-[32px] border border-white/40 bg-white/20 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-6 lg:p-8">
        <div className="mb-8 border-b border-white/20 pb-6">
          <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#5D6B57] backdrop-blur-sm">
            Control Panel
          </span>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2F3A2F] sm:text-4xl">
            User Management
          </h1>

          <p className="mt-2 text-sm font-medium text-[#5D6B57]/90 sm:text-base">
            View active accounts, block/unblock validations, and reassign system
            roles instantly.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/30 bg-white/10 shadow-inner backdrop-blur-md">
          <Table
            className="w-full min-w-full table-fixed bg-transparent text-[#2F3A2F] shadow-none"
            style={{ background: "transparent" }}
          >
            <Table.ScrollContainer className="overflow-visible">
              <Table.Content aria-label="User Management Table">
                <Table.Header className="border-b border-white/30 bg-white/15">
                  <Table.Column
                    allowsSorting
                    isRowHeader
                    className="w-[22%] min-w-[140px]"
                  >
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader
                        sortDirection={sortDirection}
                        className="p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80"
                      >
                        User / ID
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>

                  <Table.Column className="w-[24%] min-w-[150px] p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80">
                    Email
                  </Table.Column>

                  <Table.Column className="w-[12%] min-w-[90px] p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80">
                    System Role
                  </Table.Column>

                  <Table.Column className="w-[12%] min-w-[90px] p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80">
                    Current Plan
                  </Table.Column>

                  <Table.Column className="w-[12%] min-w-[80px] p-4 text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80">
                    Status
                  </Table.Column>

                  <Table.Column className="w-[18%] min-w-[150px] p-4 text-right text-xs font-bold uppercase tracking-wider text-[#2F3A2F]/80">
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
                        className={`border-b border-white/15 transition-all duration-200 last:border-0 hover:bg-white/5 ${
                          isActionLoading
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      >
                        <Table.Cell className="overflow-hidden p-4">
                          <p className="truncate text-sm font-bold text-[#2F3A2F]">
                            {item.name || "Unnamed User"}
                          </p>
                          <p className="mt-0.5 truncate font-mono text-[10px] text-[#5D6B57]/80">
                            ID: {item._id}
                          </p>
                        </Table.Cell>

                        <Table.Cell className="overflow-hidden p-4">
                          <p className="truncate text-sm font-medium text-[#4B5A42]">
                            {item.email}
                          </p>
                        </Table.Cell>

                        <Table.Cell className="overflow-hidden p-4">
                          <span className="inline-block max-w-full truncate rounded-xl border border-white/30 bg-white/20 px-2 py-0.5 text-xs font-bold capitalize text-[#4B5A42] shadow-sm backdrop-blur-sm">
                            {itemRole}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="overflow-hidden p-4">
                          <span className="inline-block max-w-full truncate rounded-xl border border-white/40 bg-white/40 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-[#5D6B57] shadow-sm">
                            {item.plan || "free"}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="overflow-hidden p-4">
                          <span
                            className={`inline-block max-w-full truncate rounded-xl border px-2 py-0.5 text-xs font-bold uppercase tracking-wider shadow-sm ${
                              status === "blocked"
                                ? "border-red-500/20 bg-red-500/10 text-red-700"
                                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                            }`}
                          >
                            {status}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="overflow-hidden p-4 text-right">
                          <div className="flex flex-row flex-nowrap items-center justify-end gap-1.5">
                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() => openBlockModal(item)}
                              className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-sm transition-all active:scale-[0.97] disabled:opacity-40 ${
                                status === "blocked"
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                                  : "border-red-500/20 bg-red-500/10 text-red-700 hover:bg-red-500/20"
                              }`}
                            >
                              {status === "blocked" ? "Unblock" : "Block"}
                            </button>

                            {itemRole !== "admin" && (
                              <button
                                type="button"
                                disabled={isActionLoading}
                                onClick={() => openRoleModal(item, "admin")}
                                className="shrink-0 whitespace-nowrap rounded-full border border-[#2F3A2F]/20 bg-[#2F3A2F]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#2F3A2F] shadow-sm transition-all hover:bg-[#2F3A2F]/20 active:scale-[0.97] disabled:opacity-40"
                              >
                                Admin
                              </button>
                            )}

                            {itemRole === "trainer" && (
                              <button
                                type="button"
                                disabled={isActionLoading}
                                onClick={() => openRoleModal(item, "member")}
                                className="shrink-0 whitespace-nowrap rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-700 shadow-sm transition-all hover:bg-amber-500/20 active:scale-[0.97] disabled:opacity-40"
                              >
                                Demote
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

      {confirmOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2
              className={`text-2xl font-black ${
                confirmAction?.type === "status" &&
                confirmAction?.nextStatus === "blocked"
                  ? "text-red-600"
                  : "text-[#2F3A2F]"
              }`}
            >
              {confirmAction?.title}
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#4B5A42]">
              {confirmAction?.message}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Please confirm before continuing.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={closeModal}
                isDisabled={Boolean(actionLoadingId)}
              >
                Cancel
              </Button>

              <Button
                color={
                  confirmAction?.type === "status" &&
                  confirmAction?.nextStatus === "blocked"
                    ? "danger"
                    : "primary"
                }
                onPress={handleConfirmAction}
                isDisabled={Boolean(actionLoadingId)}
              >
                {actionLoadingId ? "Processing..." : confirmAction?.confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}