import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TwoSeaterPopHori from "./tablePop/TwoSeaterPopHori";
import TwoSeaterPopVerti from "./tablePop/TwoSeaterPopVerti";
import FourSeaterPop from "./tablePop/FourSeaterPop";
import SixSeaterPopHori from "./tablePop/SixSeaterPopHori";
import SixSeaterPopVerti from "./tablePop/SixSeaterPopVerti";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

const floorplan_id = "697a33f9-f9d9-4ff6-97db-bc5a865494ef";

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
  }
}

const floorplan = await getFloor(floorplan_id);

export default function FloorPlanModify() {
  const renderComponent = (data) => {
    switch (data.table_type) {
      case "1":
        return <TwoSeaterPopHori tableID={data.table_id} />;

      case "2":
        return <TwoSeaterPopVerti tableID={data.table_id} />;

      case "3":
        return <FourSeaterPop tableID={data.table_id} />;

      case "4":
        return <SixSeaterPopHori tableID={data.table_id} />;

      case "5":
        return <SixSeaterPopVerti tableID={data.table_id} />;

      default:
    }
  };

  const rows = 3;
  const columns = 6;
  const totalCells = rows * columns;

  return (
    <div className="flex flex-col rounded-md gap-4 p-5 h-1/2 border">
      <div className="text-white flex text-xl h-[8%]">{floorplan.name}</div>
      <div className="flex flex-row h-[92%] space-x-4">
        <div className="flex flex-row w-full">
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
                <div key={cellId} id={cellId}>
                  <div className="flex justify-center items-center col-span-1 row-span-1 text-white w-full h-full bg-background">
                    {floorplan?.configuration[cellId] ? (
                      renderComponent(floorplan.configuration[cellId])
                    ) : (
                      <div className="text-zinc-600 text-xs font-mono">
                        No table
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
