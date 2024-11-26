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

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function ReserveDataTable() {
  const [reservations, setReservations] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data: userInfo, error } = await supabase.auth.getUser();
        if (error) {
          console.error(error);
          return;
        }
        setUserData(userInfo);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getUserReservation() {
      if (userData != null) {
        try {
          const { data: userReservationData, error } = await supabase
            .from("has_reservation")
            .select("restaurant_id,date_time,table_id,priority,additional_info")
            .eq("user_id", userData.user.id);
          if (error) {
            console.error(error);
            return;
          }

          setReservations(userReservationData);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    getUserReservation();
  }, []);

  return (
    <div className="h-[100%]">
      <div className="flex flex-col rounded-md gap-3 p-5 h-full border">
        <div className="flex flex-row space-x-3">
          <div className="text-white text-xl">Reservations</div>
          <Badge className="">{reservations ? reservations.length : 0}</Badge>
        </div>
        <div className="flex flex-col h-[92%]">
          {reservations === null ? (
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
                      <TableHead className="w-[15%]">Table</TableHead>
                      <TableHead className="w-[15%]">Time</TableHead>
                      <TableHead className="">Priority</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.name}</TableCell>
                        <TableCell>{reservation.table}</TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell>
                          {reservation.priority === 1 ? (
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
                              <DropdownMenuLabel>
                                Options for {reservation.name}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => console.log(reservation.id)}
                              >
                                Notify Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => console.log(reservation.id)}
                              >
                                View Reservation Details
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
