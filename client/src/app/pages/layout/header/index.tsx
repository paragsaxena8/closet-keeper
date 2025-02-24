import {BreadcrumbLayout} from "@/app/breadcrumb";
import { SidebarTrigger } from "@app/components/ui/sidebar";

function HeaderLayout() {
  return (
    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <h2>Dashboard</h2>
      <div className="ml-auto">
        <BreadcrumbLayout />
      </div>
    </header>
  );
}

export { HeaderLayout };
