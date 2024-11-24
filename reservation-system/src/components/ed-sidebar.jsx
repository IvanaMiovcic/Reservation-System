import * as React from "react";
import { Plus, Bolt, Layers3 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/em-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "user@example.com",
  },
};

export function AppSidebar({ ...props }) {
  const date = new Date().getDate();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <Calendar mode="single" />
        <SidebarSeparator className="mx-0" />
        <SidebarMenu className="gap-4 mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-[93%] m-auto">
              <Layers3 />
              Manage Floorplans
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
