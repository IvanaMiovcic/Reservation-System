import {
  Table,
  TableBody,
  TableCaption,
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

export default function ReserveDataTable() {
  const [reservations, setReservations] = useState(null);
  const [userData, setUserData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function deleteReservation(reservation_id) {
    try {
      const { error: to_null_error } = await supabase
        .from("has_reservation")
        .update({ priority: null })
        .eq("reservation_id", reservation_id);
      if (to_null_error) {
        console.log(to_null_error);
      }

      const { error } = await supabase
        .from("has_reservation")
        .delete()
        .eq("reservation_id", reservation_id);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo } = await supabase.auth.getUser();
        setUserData(userInfo);

        const { data: userReservation } = await supabase
          .from("has_reservation")
          .select("*")
          .eq("user_id", userInfo.user.id);
        setReservations(userReservation);

        const { data: restaurantInfo } = await supabase
          .from("restaurant")
          .select("*")
          .in(
            "id",
            userReservation.map((item) => item.restaurant_id),
          );
        setRestaurantData(restaurantInfo);

        const channel = supabase
          .channel("realtime_updates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "has_reservation",
              filter: `user_id=in.(${userInfo.user.id})`,
            },
            (payload) => {
              console.log(payload);
              switch (payload.eventType) {
                case "INSERT":
                  setReservations((prev) => [...prev, payload.new]);
                  break;
                case "UPDATE":
                  setReservations((prev) =>
                    prev.map((item) =>
                      item.reservation_id === payload.new.reservation_id
                        ? payload.new
                        : item,
                    ),
                  );
                  break;
                case "DELETE":
                  setReservations((prev) =>
                    prev.filter((item) => item.id !== payload.old.id),
                  );
                  break;
              }
            },
          )
          .subscribe();

        return () => supabase.removeChannel(channel);
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
    <div className="h-[100%]">
      <div className="flex flex-col rounded-md gap-3 p-5 h-full border">
        <div className="flex flex-row space-x-3">
          <div className="text-white text-xl">Reservations</div>
          <Badge className="">{reservations ? reservations.length : 0}</Badge>
        </div>
        <div className="flex flex-col h-[92%]">
          {reservations.length === 0 || reservations === null ? (
            <div className="text-zinc-600 text-xs font-mono m-auto">
              No reservations.
            </div>
          ) : (
            <ScrollArea>
              <div>
                <Table className="text-white">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Restaurant Name</TableHead>
                      <TableHead className="w-[15%]">Date</TableHead>
                      <TableHead className="w-[15%]">Time</TableHead>
                      <TableHead className="">Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.reservation_id}>
                        <TableCell>
                          {
                            restaurantData.find(
                              (item) => item.id === reservation.restaurant_id,
                            )?.name
                          }
                        </TableCell>
                        <TableCell>
                          {moment(reservation.date_time).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                          {moment(reservation.date_time).format("hh:mm A")}
                        </TableCell>
                        <TableCell>
                          {reservation.priority === "high" ? (
                            <Badge variant="destructive">High</Badge>
                          ) : reservation.priority === null ? (
                            <Badge variant="outline">Cancelled</Badge>
                          ) : (
                            <Badge variant="secondary">Standard</Badge>
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
                              <DropdownMenuLabel>Options</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  View reservation details
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>
                                    {reservation.additional_info === null
                                      ? reservation.additional_info
                                      : "No additional details"}
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                              <DropdownMenuItem
                                onClick={() => console.log(reservation.id)}
                              >
                                Modify Reservation
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  void deleteReservation(
                                    reservation.reservation_id,
                                  )
                                }
                              >
                                Cancel Reservation
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
