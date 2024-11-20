import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { TwoSeaterAvaiHori } from "./TwoSeater";
import { FourSeaterAvai } from "./FourSeater";
import { SixSeaterAvaiHori } from "./SixSeater";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";

export default function FloorPlanDnD() {
  function twoSeaterDrag() {
    const uuid = uuidv4();
    return (
      <Draggable id={`2+${uuid}`}>
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

  function sixSeaterDrag() {
    const uuid = uuidv4();
    return (
      <Draggable id={`6+${uuid}`}>
        <SixSeaterAvaiHori />
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
      case "6":
        return <SixSeaterAvaiHori />;
      default:
        return <Plus className="text-zinc-500" />;
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
            {setPlacedComponents(() => (
              <Plus className="text-zinc-500" />
            ))}
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
      <div className="flex flex-col rounded-md space-y-4 p-5 h-1/2 border">
        <div className="text-white text-2xl">
          Create Floor Plan: Work in Progress; Will be in modify-floor-plan page
        </div>
        <div className="flex flex-row flex-grow space-x-4">
          <div className="grid grid-rows-3 grid-cols-6 w-full">
            {Array.from({ length: totalCells }).map((_, index) => {
              const row = Math.floor(index / columns);
              const col = index % columns;
              const cellId = `cell-${row}-${col}`;
              return (
                <Droppable key={cellId} id={cellId}>
                  <div className="flex justify-center items-center col-span-1 row-span-1 text-white w-full h-full border-[0.5px] bg-background">
                    {placedComponents[cellId] ? (
                      renderComponent(placedComponents[cellId])
                    ) : (
                      <Plus className="text-zinc-500" />
                    )}
                  </div>
                </Droppable>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="">{twoSeaterDrag()}</div>
            <div className="">{sixSeaterDrag()}</div>
            <div className="">{fourSeaterDrag()}</div>
            <div onClick={() => clearFloor()}>
              <Button>Reset Floor</Button>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
