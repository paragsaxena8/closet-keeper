import { AppSidebar } from "@app/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@app/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export { Layout };
