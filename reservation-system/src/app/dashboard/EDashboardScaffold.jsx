import { AppSidebar } from "@/components/ed-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Time from "@/components/Time";
import ReserveDataTable from "@/components/EDReserveDataTable";
import FloorPlanView from "@/components/FloorPlanView";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function DashboardScaffold() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo, error } = await supabase.auth.getUser();
        if (error) {
          navigate("/log-in");
        }
        if (userInfo.user.user_metadata.account_type === "Customer") {
          navigate("/customer-home");
        }
        const { data: restaurantInfo } = await supabase
          .from("works_at")
          .select("restaurant_id")
          .eq("user_id", userInfo.user.id);
        const { data } = await supabase
          .from("restaurant")
          .select("name")
          .eq("id", restaurantInfo[0].restaurant_id);
        setRestaurantName(data[0].name);
      } catch (error) {
        console.log(error);
        navigate("/");
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen">
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 text-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex w-full justify-between">
            {restaurantName !== null ? `${restaurantName}` : "Restaurant Name"}
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
