import { useState } from "react";
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
import { SixSeaterAvaiVerti } from "../SixSeater";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function SixSeaterPopVerti(props) {
  const tableID = props.tableID;
  const [tableNo, setTableNo] = useState("");
  const [seatingType, setSeatingType] = useState("");
  const [seatingLocation, setSeatingLocation] = useState("");
  const [textField, setTextField] = useState("");

  function handleTextField(event) {
    setTextField(event.target.value);
  }

  function handleSeatingTypeChange(event) {
    setSeatingType(event.toLowerCase());
  }

  function handleSeatingLocationChange(event) {
    setSeatingLocation(event.toLowerCase());
  }

  function saveChanges() {
    setTableNo(textField);
    saveTableAttributes();
  }

  async function getTableAttributes() {
    try {
      const { data, error } = await supabase
        .from("table")
        .select("*")
        .eq("table_id", tableID);

      if (error) {
        console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }

  async function saveTableAttributes() {
    try {
      const { error } = await supabase
        .from("table")
        .update({
          table_no: tableNo,
          seating_type: seatingType,
          seating_location: seatingLocation,
        })
        .eq("table_id", tableID);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger onClick={() => getTableAttributes()}>
        <SixSeaterAvaiVerti />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col p-1 space-y-4">
          <div className="text-lg text">Edit table attributes</div>
          <div className="flex flex-row w-[95%] justify-between">
            <Label> Table Number </Label>
            <Input
              id="tableNo"
              value={textField}
              type="text"
              placeholder={tableNo}
              onChange={handleTextField}
            />
          </div>
          <div className="flex flex-row w-[95%] justify-between">
            <Label> Seating Type </Label>
            <Select onValueChange={handleSeatingTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder={seatingType} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Options</SelectLabel>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row w-[95%] justify-between">
            <Label> Seating Location </Label>
            <Select onValueChange={handleSeatingLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder={seatingLocation} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Options</SelectLabel>
                  <SelectItem value="Indoor">Indoor</SelectItem>
                  <SelectItem value="Outdoor">Outdoor</SelectItem>
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
