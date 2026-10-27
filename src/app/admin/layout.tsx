import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="grid min-h-screen bg-admin text-[15px] md:grid-cols-[248px_1fr]">
      <Sidebar />
      <main className="min-w-0 px-4 pt-5 pb-[50px] md:px-8 md:pt-7 md:pb-[60px]">{children}</main>
    </div>
  );
}
