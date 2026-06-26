import RoleGuard from "@/components/auth/RoleGuard";

export default function TrainerLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["trainer"]}>
      {children}
    </RoleGuard>
  );
}