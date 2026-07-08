// import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center border-b px-6">
          <SidebarTrigger />
          <h1 className="ml-4 text-xl font-semibold">
            Dashboard
          </h1>
        </header>
        <main className="p-6">
          {/* <Outlet /> */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}