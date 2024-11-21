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

const reservations = [
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Font Goodman",
    time: "7:15 PM",
    table: "7",
    priority: 1,
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "Silas Scratch",
    time: "9:30 PM",
    table: "9",
    priority: 0,
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Font Goodman",
    time: "7:15 PM",
    table: "7",
    priority: 1,
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "Silas Scratch",
    time: "9:30 PM",
    table: "9",
    priority: 0,
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    name: "Gary Ken",
    time: "9:40 PM",
    table: "6",
    priority: 1,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Abraham Lincoln",
    time: "8:35 PM",
    table: "1",
    priority: 0,
    email: "Abe45@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Swiss",
    time: "6:00 PM",
    table: "15",
    priority: 1,
    email: "carmella@hotmail.com",
  },
];

export default function ReserveDataTable() {
  return (
    <div className="h-1/2">
      <div className="flex flex-col rounded-md gap-3 p-5 h-full border">
        <div className="flex flex-row space-x-3 h-[8%]">
          <div className="text-white text-xl">Reservations</div>
          <Badge className="">{reservations.length}</Badge>
        </div>
        <div className="flex flex-col h-[92%]">
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
        </div>
      </div>
    </div>
  );
}
