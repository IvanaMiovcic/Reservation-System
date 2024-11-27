import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { NavUser } from "@/components/ct-nav-user";
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
import LoadingPage from "./LoadingPage";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo, error } = await supabase.auth.getUser();
        if (error) {
          console.error(error);
          return;
        }
        setUserData(userInfo);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={userData.user} />
      </SidebarHeader>
      <SidebarContent>
        <Calendar mode="single" />
        <SidebarSeparator className="mx-0" />
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
