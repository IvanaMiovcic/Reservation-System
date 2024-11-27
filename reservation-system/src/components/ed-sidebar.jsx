import React, { useEffect, useState } from "react";
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
import { createClient } from "@supabase/supabase-js";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";

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
        <SidebarMenu className="gap-4 mt-4">
          <SidebarMenuItem>
            <Link to="/modify-floorplan">
              <SidebarMenuButton className="w-[93%] m-auto">
                <Layers3 />
                Manage Floorplans
              </SidebarMenuButton>
            </Link>
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
