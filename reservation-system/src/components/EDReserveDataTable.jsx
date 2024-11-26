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

export default function ReserveDataTable() {
  const [reservations, setReservations] = useState(null);
  const [userData, setUserData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
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
        setRestaurantData(restaurantInfo);
        const { data: restaurantReservation } = await supabase
          .from("has_reservation")
          .select(
            "reservation_id, user_id, customer_name, date_time, priority, additional_info",
          )
          .in(
            "restaurant_id",
            restaurantInfo.map((item) => item.restaurant_id),
          );
        setReservations(restaurantReservation);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    const channel = supabase
      .channel("realtime_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "has_reservation" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setReservations((prev) => [...prev, payload.new]);
              break;
            case "UPDATE":
              setReservations((prev) =>
                prev.map((item) =>
                  item.reservation_id === payload.new.id ? payload.new : item,
                ),
              );
              break;
            case "DELETE":
              setReservations((prev) =>
                prev.filter((item) => item.reservation_id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
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
                      <TableHead className="">Name</TableHead>
                      <TableHead className="w-[15%]">Date</TableHead>
                      <TableHead className="w-[15%]">Time</TableHead>
                      <TableHead className="">Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.restaurant_id}>
                        <TableCell>{reservation.customer_name}</TableCell>
                        <TableCell>
                          {moment(reservation.date_time).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                          {moment(reservation.date_time).format("hh:mm A")}
                        </TableCell>
                        <TableCell>
                          {reservation.priority === "high" ? (
                            <Badge variant="destructive">High</Badge>
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
                              <DropdownMenuItem
                                onClick={() => console.log(reservation.id)}
                              >
                                View Reservation Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => console.log(reservation.id)}
                              >
                                Modify Reservation
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => console.log(reservation.id)}
                              >
                                Delete Reservation
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
