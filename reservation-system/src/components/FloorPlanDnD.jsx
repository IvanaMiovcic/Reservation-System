import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { TwoSeaterAvaiHori } from "./TwoSeater";
import { FourSeaterAvai } from "./FourSeater";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";

export default function FloorPlanDnD() {
  function twoSeaterDrag() {
    return (
      <Draggable id={`2+${uuidv4()}`}>
        <TwoSeaterAvaiHori />
      </Draggable>
    );
  }
  function fourSeaterDrag() {
    const uuid = uuidv4();
    return (
      <Draggable id={`4+${uuid}`}>
        <FourSeaterAvai />
      </Draggable>
    );
  }

  const [placedComponents, setPlacedComponents] = useState({});

  function getComponentType(id) {
    return id.split("+")[0] || null;
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      setPlacedComponents((prev) => ({
        ...prev,
        [over.id]: {
          type: getComponentType(active.id),
          id: active.id,
        },
      }));
    }
  }

  const renderComponent = (data) => {
    switch (data.type) {
      case "2":
        return <TwoSeaterAvaiHori />;

      case "4":
        return <FourSeaterAvai />;
      default:
        return "Drop here";
    }
  };

  function clearFloor() {
    return Array.from({ length: totalCells }).map((_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const cellId = `cell-${row}-${col}`;
      return (
        <Droppable key={cellId} id={cellId}>
          <div className="col-span-1 row-span-1 border text-white w-full h-full">
            {setPlacedComponents(() => "")}
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
      <div className="flex flex-row h-1/2 border p-5 rounded-md space-x-4">
        <div className="grid grid-rows-3 bg-primary-foreground grid-cols-6 w-full bg-black border">
          {Array.from({ length: totalCells }).map((_, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            const cellId = `cell-${row}-${col}`;
            return (
              <Droppable key={cellId} id={cellId}>
                <div className="col-span-1 row-span-1 border text-white w-full h-full">
                  {placedComponents[cellId]
                    ? renderComponent(placedComponents[cellId])
                    : ""}
                </div>
              </Droppable>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="">{twoSeaterDrag()}</div>
          <div className="">{fourSeaterDrag()}</div>
          <div onClick={() => clearFloor()}>
            <Button>Reset Floor</Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
