import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TwoSeaterAvaiHori,
  TwoSeaterAvaiVerti,
  TwoSeaterTakenHori,
  TwoSeaterTakenVerti,
} from "../TwoSeater";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

function TwoSeaterViewHori(props) {
  const tableID = props.tableID;
  const [tableNo, setTableNo] = useState("");
  const [seatingType, setSeatingType] = useState("");
  const [seatingLocation, setSeatingLocation] = useState("");
  const [trackAvailability, setTrackAvailability] = useState("");
  const [availability, setAvailability] = useState(false);

  function trackAvailabilityChange(event) {
    setTrackAvailability(event);
  }

  function saveChanges() {
    let newAvailability;
    switch (trackAvailability) {
      case "Available":
        newAvailability = false;
        break;
      case "Occupied":
        newAvailability = true;
        break;
      default:
        newAvailability = false;
    }

    setAvailability(newAvailability);
    saveTableAttributes(newAvailability);
  }

  async function getTableAttributes() {
    try {
      const { data, error } = await supabase
        .from("table")
        .select("*")
        .eq("table_id", tableID);

      if (error) {
        console.error(error);
        return;
      }

      setTableNo(data[0].table_no);
      setSeatingType(
        data[0].seating_type.charAt(0).toUpperCase() +
          data[0].seating_type.slice(1),
      );
      setSeatingLocation(
        data[0].seating_location.charAt(0).toUpperCase() +
          data[0].seating_location.slice(1),
      );
      setAvailability(data[0].is_occupied);
      setTrackAvailability(data[0].is_occupied ? "Occupied" : "Available");
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTableAttributes(value) {
    try {
      const { error } = await supabase
        .from("table")
        .update({ is_occupied: value })
        .eq("table_id", tableID);

      if (error) {
        console.error(error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTableAttributes();
  }, [tableID]);

  return (
    <Popover>
      <PopoverTrigger onClick={() => getTableAttributes()}>
        {availability === false ? (
          <TwoSeaterAvaiHori />
        ) : (
          <TwoSeaterTakenHori />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col p-1 space-y-4 font-poppins">
          <div className="text-lg text">
            {tableNo === null ? "Table status" : ` Table ${tableNo} status`}
          </div>
          <div>
            Table number: {tableNo === null ? "Unassigned" : `${tableNo}`}
          </div>
          <div>Seating Type: {seatingType}</div>
          <div>Seating Location: {seatingLocation}</div>
          <div className="flex flex-row w-full justify-between">
            <Select onValueChange={trackAvailabilityChange}>
              <SelectTrigger>
                <SelectValue placeholder={trackAvailability} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="font-poppins">
                  <SelectLabel>Available Options</SelectLabel>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" onClick={() => saveChanges()}>
            Save Changes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TwoSeaterViewVerti(props) {
  const tableID = props.tableID;
  const [tableNo, setTableNo] = useState("");
  const [seatingType, setSeatingType] = useState("");
  const [seatingLocation, setSeatingLocation] = useState("");
  const [trackAvailability, setTrackAvailability] = useState("Available");
  const [availability, setAvailability] = useState(false);

  function trackAvailabilityChange(event) {
    setTrackAvailability(event);
  }

  function saveChanges() {
    let newAvailability;
    switch (trackAvailability) {
      case "Available":
        newAvailability = false;
        break;
      case "Occupied":
        newAvailability = true;
        break;
      default:
        newAvailability = false;
    }

    setAvailability(newAvailability);
    saveTableAttributes(newAvailability);
  }

  async function getTableAttributes() {
    try {
      const { data, error } = await supabase
        .from("table")
        .select("*")
        .eq("table_id", tableID);

      if (error) {
        console.error(error);
        return;
      }

      setTableNo(data[0].table_no);
      setSeatingType(
        data[0].seating_type.charAt(0).toUpperCase() +
          data[0].seating_type.slice(1),
      );
      setSeatingLocation(
        data[0].seating_location.charAt(0).toUpperCase() +
          data[0].seating_location.slice(1),
      );

      setAvailability(data[0].is_occupied);
      setTrackAvailability(data[0].is_occupied ? "Occupied" : "Available");
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTableAttributes(value) {
    try {
      const { error } = await supabase
        .from("table")
        .update({ is_occupied: value })
        .eq("table_id", tableID);

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTableAttributes();
  }, [tableID]);

  return (
    <Popover>
      <PopoverTrigger onClick={() => getTableAttributes()}>
        {availability === false ? (
          <TwoSeaterAvaiVerti />
        ) : (
          <TwoSeaterTakenVerti />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col p-1 space-y-4 font-poppins">
          <div className="text-lg text">
            {tableNo === null ? "Table status" : ` Table ${tableNo} status`}
          </div>
          <div>
            Table number: {tableNo === null ? "Unassigned" : `${tableNo}`}
          </div>
          <div>Seating Type: {seatingType}</div>
          <div>Seating Location: {seatingLocation}</div>
          <div className="flex flex-row w-full justify-between">
            <Select onValueChange={trackAvailabilityChange}>
              <SelectTrigger>
                <SelectValue placeholder={trackAvailability} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="font-poppins">
                  <SelectLabel>Available Options</SelectLabel>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" onClick={() => saveChanges()}>
            Save Changes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { TwoSeaterViewHori, TwoSeaterViewVerti };
