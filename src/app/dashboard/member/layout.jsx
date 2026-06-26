import RoleGuard from "@/components/auth/RoleGuard";

export default function MemberLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["member"]}>
      {children}
    </RoleGuard>
  );
}