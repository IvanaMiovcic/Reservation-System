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

export default function ReserveDataTable() {
  return (
    <div className="flex flex-col rounded-md gap-3 p-5 h-1/2 border">
      <div className="flex flex-row space-x-3">
        <div className="text-white text-xl">Reservations</div>
        <Badge className="">20</Badge>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="w-[15%]">Table</TableHead>
              <TableHead className="w-[15%]">Time</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
