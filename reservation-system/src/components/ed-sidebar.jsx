import React, { useEffect, useState } from "react";
import { Plus, Bolt, Layers3 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/em-nav-user";
import { Loader2 } from "lucide-react";
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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

const { data } = await supabase.auth.getUser();

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          console.error(error);
          return;
        }
        setUserData(userData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

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
