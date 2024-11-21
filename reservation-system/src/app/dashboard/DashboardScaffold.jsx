import { AppSidebar } from "@/components/app-sidebar";
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

export default function DashboardScaffold() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 text-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex w-full justify-between">
            <text>Restaurant Name</text>
            <Badge variant="secondary">
              <Time />
            </Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <ReserveDataTable />
          <FloorPlanDnD />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
