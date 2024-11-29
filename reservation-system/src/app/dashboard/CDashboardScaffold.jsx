import { AppSidebar } from "@/components/cd-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ReserveDataTable from "@/components/CDReserveDataTable";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function DashboardScaffold() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: user_data, error } = await supabase.auth.getUser();
        if (error) {
          navigate("/log-in");
        }
        if (
          user_data.user.user_metadata.account_type === "Employee" ||
          user_data.user.user_metadata.account_type === "Manager"
        ) {
          navigate("/employee-home");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    }

    checkUser();
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
          <div className="flex w-full justify-end">
            <Link to="/create-reservation">
              <Button>Make Reservation</Button>
            </Link>
          </div>
        </header>
        <div className="flex flex-col h-[93.3%] gap-4 p-4">
          <ReserveDataTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
