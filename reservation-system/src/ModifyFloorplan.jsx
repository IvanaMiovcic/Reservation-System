import React from "react";
import { Link } from "react-router-dom";
import FloorplanTable from "./components/FloorplanTable";
import FloorPlanModify from "./components/FloorPlanModify";
import BackHeader from "./components/BackHeader";
import { Button } from "./components/ui/button";

export default function ModifyFloorplan() {
  return (
    <div className="dark bg-background font-poppins w-[100%] h-screen flex flex-col">
      <div className="flex flex-col h-[100%] gap-4 p-4">
        <div className="flex flex-row items-center justify-between p-0">
          <BackHeader backLink="/employee-home" />
          <div>
            <Link to="/add-floorplan">
              <Button>Create a floorplan</Button>
            </Link>
          </div>
        </div>
        <FloorplanTable />
        <FloorPlanModify />
      </div>
    </div>
  );
}
