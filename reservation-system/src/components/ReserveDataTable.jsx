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
import { useState } from "react";

export default function ReserveDataTable() {
  const [reservations, setReservations] = useState(null);

  return (
    <div className="h-1/2">
      <div className="flex flex-col rounded-md gap-3 p-5 h-full border">
        <div className="flex flex-row space-x-3 h-[8%]">
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
                      <TableHead className="">Name</TableHead>
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
