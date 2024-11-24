import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { TwoSeaterAvaiHori, TwoSeaterAvaiVerti } from "./TwoSeater";
import { FourSeaterAvai } from "./FourSeater";
import { SixSeaterAvaiHori, SixSeaterAvaiVerti } from "./SixSeater";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Pencil } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function FloorPlanDnD() {
  function twoSeaterPopHori() {
    return (
      <Draggable id={`1+${uuid}`}>
        <TwoSeaterAvaiHori />
      </Draggable>
    );
  }

  function twoSeaterPopVerti() {
    return (
      <Draggable id={`2+${uuid}`}>
        <TwoSeaterAvaiVerti />
      </Draggable>
    );
  }

  function fourSeaterPop() {
    return (
      <Draggable id={`3+${uuid}`}>
        <FourSeaterAvai />
      </Draggable>
    );
  }

  function sixSeaterPopHori() {
    return (
      <Draggable id={`4+${uuid}`}>
        <SixSeaterAvaiHori />
      </Draggable>
    );
  }

  function sixSeaterPopVerti() {
    return (
      <Draggable id={`5+${uuid}`}>
        <SixSeaterAvaiVerti />
      </Draggable>
    );
  }

  const [configuration, setConfiguration] = useState({});
  const [floorName, setFloorName] = useState("New Floorplan");
  const [textField, setTextField] = useState(floorName);

  function getComponentType(id) {
    return id.split("+")[0] || null;
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      setConfiguration((prev) => ({
        ...prev,
        [over.id]: {
          table_id: active.id,
          table_type: getComponentType(active.id),
        },
      }));
    }
  }

  const renderComponent = (data) => {
    switch (data.table_type) {
      case "1":
        return <TwoSeaterAvaiHori />;

      case "2":
        return <TwoSeaterAvaiVerti />;

      case "3":
        return <FourSeaterAvai />;

      case "4":
        return <SixSeaterAvaiHori />;

      case "5":
        return <SixSeaterAvaiVerti />;

      default:
    }
  };

  function floorNameChange() {
    setFloorName(textField);
  }

  function textFieldChange(event) {
    setTextField(event.target.value);
  }

  async function saveFloor() {
    const floorplan_id = uuidv4();
    //const floor_configuration = Object.entries(configuration).map((item) => ({
    //  [item[0]]: item[1],
    //}));

    try {
      const { dbData, error } = await supabase.from("floorplan").insert([
        {
          floorplan_id: floorplan_id,
          name: floorName,
          configuration: configuration,
        },
      ]);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function clearFloor() {
    {
      setConfiguration(() => ({}));
    }
    return Array.from({ length: totalCells }).map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const cellId = `cell-${row}-${col}`;
      const rowCalc = row * 6;
      const colCalc = col + 1;
      let tableNo = rowCalc + colCalc;
      if (tableNo < 10) {
        tableNo = `0${tableNo}`;
      } else {
        tableNo = `${tableNo}`;
      }
      return (
        <Droppable key={cellId} id={cellId}>
          <div className="col-span-1 row-span-1 border text-white w-full h-full">
            <div className="text-zinc-600 text-xs font-mono">{tableNo}</div>
          </div>
        </Droppable>
      );
    });
  }

  const rows = 3;
  const columns = 6;
  const totalCells = rows * columns;

  return (
    <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
      <div className="flex flex-col rounded-md gap-4 p-5 h-1/2 border">
        <div className="text-white flex h-[8%]">
          <Dialog on>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xl">
                {floorName}
                <Pencil className="text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Name</DialogTitle>
              </DialogHeader>
              <div>
                <div className="w-full flex flex-row space-x-4 justify-between">
                  <Input
                    id="name"
                    type="text"
                    value={textField}
                    placeholder={floorName}
                    onChange={textFieldChange}
                  />
                  <Button type="submit" onClick={floorNameChange}>
                    Save changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-row h-[92%] space-x-4">
          <div className="flex flex-row w-[80%]">
            <div className="grid grid-flow-row grid-cols-6 grid-rows-3 border w-full">
              {Array.from({ length: totalCells }).map((_, index) => {
                const row = Math.floor(index / columns);
                const col = index % columns;
                const cellId = `${row}-${col}`;
                const rowCalc = row * 6;
                const colCalc = col + 1;
                let tableNo = rowCalc + colCalc;
                if (tableNo < 10) {
                  tableNo = `0${tableNo}`;
                } else {
                  tableNo = `${tableNo}`;
                }
                return (
                  <Droppable key={cellId} id={cellId}>
                    <div className="flex justify-center items-center col-span-1 row-span-1 text-white w-full h-full bg-background">
                      {configuration[cellId] ? (
                        renderComponent(configuration[cellId])
                      ) : (
                        <div className="text-zinc-600 text-xs font-mono">
                          {tableNo}
                        </div>
                      )}
                    </div>
                  </Droppable>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-[20%]">
            <div className="inline-grid grid-cols-2 gap-4">
              <div className="flex justify-center align-middle">
                {twoSeaterDragHori()}
              </div>
              <div className="flex justify-center align-middle">
                {twoSeaterDragVerti()}
              </div>
              <div className="flex justify-center align-middle">
                {sixSeaterDragHori()}
              </div>
              <div className="flex justify-center align-middle">
                {sixSeaterDragVerti()}
              </div>
              <div className="flex justify-center align-middle">
                {fourSeaterDrag()}
              </div>
            </div>

            <div className="flex flex-row justify-between gap-4">
              <div onClick={() => clearFloor()}>
                <Button variant="destructive">Reset Floor</Button>
              </div>
              <div onClick={() => saveFloor()}>
                <Button>Create Floor</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
