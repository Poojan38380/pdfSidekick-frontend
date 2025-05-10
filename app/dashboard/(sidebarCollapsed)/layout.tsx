import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashHeader from "../_components/dash-header";
import { AppSidebar } from "../_components/sidebar/admin-sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="overflow-x-auto   ">
        <DashHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
