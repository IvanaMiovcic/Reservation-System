import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import LoadingPage from "./LoadingPage";
import moment from "moment/moment";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function FloorplanTable() {
  const [userData, setUserData] = useState(null);
  const [floorplans, setFloorplans] = useState(null);
  const [floorplanData, setFloorplanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo } = await supabase.auth.getUser();
        setUserData(userInfo);
        const { data: restaurantInfo } = await supabase
          .from("works_at")
          .select("restaurant_id")
          .eq("user_id", userInfo.user.id);
        const { data: restaurantFloorplans } = await supabase
          .from("uses_floorplan")
          .select("*")
          .eq("restaurant_id", restaurantInfo[0].restaurant_id);
        setFloorplans(restaurantFloorplans);
        const { data: floorplanInfo } = await supabase
          .from("floorplan")
          .select("*")
          .in(
            "floorplan_id",
            restaurantFloorplans.map((item) => item.floorplan_id),
          );
        setFloorplanData(floorplanInfo);

        const restaurantFloorPlanChannel = supabase
          .channel("realtime_updates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "uses_floorplan",
              filter: `restaurant_id=eq.${restaurantInfo[0].restaurant_id}`,
            },
            (payload) => {
              switch (payload.eventType) {
                case "INSERT":
                  setFloorplans((prev) => [...prev, payload.new]);
                  break;
                case "UPDATE":
                  setFloorplans((prev) =>
                    prev.map((item) =>
                      item.reservation_id === payload.new.id
                        ? payload.new
                        : item,
                    ),
                  );
                  break;
                case "DELETE":
                  setFloorplans((prev) =>
                    prev.filter(
                      (item) => item.reservation_id !== payload.old.id,
                    ),
                  );
                  break;
              }
            },
          )
          .subscribe();

        const floorPlanDataChannel = supabase
          .channel("realtime_updates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "floorplan",
              filter: `floorplan_id=eq.${floorplans.map((item) => item.floorplan_id)}`,
            },
            (payload) => {
              switch (payload.eventType) {
                case "INSERT":
                  setFloorplanData((prev) => [...prev, payload.new]);
                  break;
                case "UPDATE":
                  setFloorplanData((prev) =>
                    prev.map((item) =>
                      item.reservation_id === payload.new.id
                        ? payload.new
                        : item,
                    ),
                  );
                  break;
                case "DELETE":
                  setFloorplanData((prev) =>
                    prev.filter(
                      (item) => item.reservation_id !== payload.old.id,
                    ),
                  );
                  break;
              }
            },
          )
          .subscribe();

        return () => {
          supabase.removeChannel(restaurantFloorPlanChannel);
          supabase.removeChannel(floorPlanDataChannel);
        };
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
    <div className="h-full">
      <div className="flex flex-col rounded-md gap-3 p-5 h-full border">
        <div className="flex flex-row space-x-3">
          <div className="text-white text-xl">Manage Floorplans</div>
          <Badge className="">{floorplans ? floorplans.length : 0}</Badge>
        </div>
        <div className="flex flex-col h-[92%]">
          {floorplans.length === 0 || floorplans === null ? (
            <div className="text-zinc-600 text-xs font-mono m-auto">
              No floorplans.
            </div>
          ) : (
            <ScrollArea>
              <div>
                <Table className="text-white">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Floorplan Name</TableHead>
                      <TableHead className="">Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {floorplans.map((floorplan) => (
                      <TableRow key={floorplan.floorplan_id}>
                        <TableCell>
                          {
                            floorplanData.find(
                              (item) =>
                                item.floorplan_id === floorplan.floorplan_id,
                            )?.name
                          }
                        </TableCell>
                        <TableCell>
                          {floorplan.is_active === true ? (
                            <Badge variant="destructive">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">
                                <Ellipsis />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                {`Options for ${
                                  floorplanData.find(
                                    (item) =>
                                      item.floorplan_id ===
                                      floorplan.floorplan_id,
                                  )?.name
                                }`}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Set active</DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  console.log(floorplan.floorplan_id)
                                }
                              >
                                Delete floorplan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
