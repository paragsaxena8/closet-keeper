import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Eye,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@app/components/nav-main";
import { NavUser } from "@app/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@app/components/ui/sidebar";
import { Header } from "@app/components/ui/header";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      hasSub: false,
    },
    {
      title: "My Wardrobe",
      url: "/wardrobe",
      icon: GalleryVerticalEnd,
      hasSub: true,
      items: [
        {
          title: "Add Item",
          url: "#",
          icon: Plus,
        },
        {
          title: "View Items",
          url: "/wardrobe",
          icon: Eye,
        },
      ],
    },
    {
      title: "My Categories",
      url: "#",
      icon: Bot,
      hasSub: true,
      items: [
        {
          title: "Clothes",
          url: "#",
        },
        {
          title: "Accessories",
          url: "#",
        },
        {
          title: "Shoes",
          url: "#",
        },
      ],
    },
    {
      title: "My Outfits",
      url: "#",
      icon: AudioWaveform,
      hasSub: true,
      items: [
        {
          title: "Create Outfit",
          url: "#",
        },
        {
          title: "View Outfits",
          url: "#",
        },
      ],
    },
    {
      title: "My Style",
      url: "#",
      icon: BookOpen,
      hasSub: true,
      items: [
        {
          title: "Style Quiz",
          url: "#",
        },
        {
          title: "Style Guide",
          url: "#",
        },
      ],
    },
    {
      title: "Preferences",
      url: "#",
      icon: Settings2,
      hasSub: true,
      items: [
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Privacy",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
