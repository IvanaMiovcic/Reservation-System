import { AppSidebar } from "@/components/ed-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Time from "@/components/Time";
import FloorPlanDnD from "@/components/FloorPlanDnD";
import ReserveDataTable from "@/components/ReserveDataTable";
import FloorPlanModify from "@/components/FloorPlanModify";
import FloorPlanView from "@/components/FloorPlanView";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

function get_date() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const date = d.getDate();
  const month_index = d.getMonth();
  const year = d.getFullYear();
  return `${months[month_index]} ${date}, ${year}`;
}

let restaurant_name;

async function getRestaurantName() {
  try {
    const { data: user_data } = await supabase.auth.getUser();
    try {
      const { data: restaurant_data } = await supabase
        .from("works_at")
        .select("restaurant_id")
        .eq("user_id", user_data.user.id);
      try {
        const { data } = await supabase
          .from("restaurant")
          .select("name")
          .eq("id", restaurant_data[0].restaurant_id);
        restaurant_name = data[0].name;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function DashboardScaffold() {
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data: user_data, error } = await supabase.auth.getUser();
      if (error) {
        navigate("/log-in");
      }
      if (user_data.user.user_metadata.account_type === "Customer") {
        navigate("/customer-home");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
    getRestaurantName();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 text-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex w-full justify-between">
            {restaurant_name ? `${restaurant_name}` : "Restaurant Name"}
            <Badge variant="outline">
              <Time />
            </Badge>
          </div>
        </header>
        <div className="flex flex-col h-[93.3%] gap-4 p-4">
          <ReserveDataTable />
          <FloorPlanView />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
