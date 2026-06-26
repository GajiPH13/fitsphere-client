"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function RoleGuard({
  allowedRoles = [],
  children,
}) {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    // Not logged in
    if (!session?.user) {
      router.replace("/auth/signin");
    }
  }, [session, isPending, router]);

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#6B8E23] border-t-transparent"></div>

          <p className="text-lg font-medium text-[#2F3A2F]">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Visitor
  if (!session?.user) {
    return null;
  }

  const userRole = session.user.role;

  // Wrong role
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="max-w-lg rounded-[32px] border border-red-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <span className="text-4xl">🚫</span>
          </div>

          <h1 className="text-4xl font-black text-[#2F3A2F]">
            Access Denied
          </h1>

          <p className="mt-4 text-[#5D6B57]">
            You don't have permission to access this page.
          </p>

          <p className="mt-2 text-sm text-[#8A9784]">
            Required Role:{" "}
            <span className="font-semibold">
              {allowedRoles.join(" / ")}
            </span>
          </p>

          <button
            onClick={() => router.back()}
            className="mt-8 rounded-full bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:bg-[#5A7A1E]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Authorized
  return children;
}