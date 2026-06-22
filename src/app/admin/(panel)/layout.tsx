import { AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 pt-16 lg:p-10 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
