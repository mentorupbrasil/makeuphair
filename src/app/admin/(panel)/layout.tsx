import { AdminSidebar } from "@/components/admin/sidebar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-cream/20">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 pt-16 lg:p-8 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
