import React from "react";
import BackHeader from "./components/BackHeader";
import FloorPlanDnD from "./components/FloorPlanDnD";

export default function CreateFloorplan() {
  return (
    <div className="dark bg-background font-poppins w-[100%] h-screen flex flex-col">
      <div className="flex flex-col h-[100%] gap-4 p-4">
        <BackHeader backLink="/modify-floorplan" />
        <FloorPlanDnD />
      </div>
    </div>
  );
}
