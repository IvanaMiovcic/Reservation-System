import React, { useState } from "react";
import { TwoSeaterAvaiHori, TwoSeaterAvaiVerti } from "./TwoSeater";
import { FourSeaterAvai } from "./FourSeater";
import { SixSeaterAvaiHori, SixSeaterAvaiVerti } from "./SixSeater";
import { createClient } from "@supabase/supabase-js";
import { Badge } from "./ui/badge";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

const floorplan_id = "7c93a5b8-735f-4399-a3cb-ccf6d73c8762";

async function getFloor(floorplan_id) {
  try {
    const { data, error } = await supabase
      .from("floorplan")
      .select("name, configuration")
      .eq("floorplan_id", floorplan_id);

    if (error) {
      console.log(error);
    }

    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

const floorplan = await getFloor(floorplan_id);

export default function FloorPlanView() {
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

  const rows = 3;
  const columns = 6;
  const totalCells = rows * columns;

  return (
    <div className="flex flex-col rounded-md gap-4 p-5 h-1/2 border">
      {floorplan ? (
        <div className="flex flex-row text-xl gap-3 h-[8%]">
          <div className="text-white">Floor Status</div>
          <Badge>{floorplan.name}</Badge>
        </div>
      ) : (
        <div className="flex flex-row text-xl h-[8%]">
          <div className="text-white">Floor Status</div>
        </div>
      )}

      <div className="flex flex-row h-[92%] space-x-4">
        <div className="flex flex-row w-full">
          {floorplan === null ? (
            <div className="text-zinc-600 text-xs font-mono m-auto">
              No floorplans.
            </div>
          ) : (
            <div className="grid grid-flow-row grid-cols-6 grid-rows-3 w-full">
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
                  <div key={cellId} id={cellId}>
                    <div className="flex justify-center items-center col-span-1 row-span-1 text-white w-full h-full bg-background">
                      {floorplan?.configuration[cellId] ? (
                        renderComponent(floorplan.configuration[cellId])
                      ) : (
                        <div className="text-zinc-600 text-xs font-mono"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
