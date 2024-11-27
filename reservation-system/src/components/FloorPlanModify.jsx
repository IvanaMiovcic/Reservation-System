import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import TwoSeaterPopHori from "./tablePop/TwoSeaterPopHori";
import TwoSeaterPopVerti from "./tablePop/TwoSeaterPopVerti";
import FourSeaterPop from "./tablePop/FourSeaterPop";
import SixSeaterPopHori from "./tablePop/SixSeaterPopHori";
import SixSeaterPopVerti from "./tablePop/SixSeaterPopVerti";
import LoadingPage from "./LoadingPage";
import { Badge } from "./ui/badge";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function FloorPlanModify() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [restaurantFloorPlans, setRestaurantFloorPlans] = useState(null);
  const [floorplanData, setFloorplanData] = useState(null);
  const [activeFloorplan, setActiveFloorplan] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo, error } = await supabase.auth.getUser();
        if (error) {
          console.error(error);
        }
        setUserData(userInfo);
        const { data: restaurantInfo } = await supabase
          .from("works_at")
          .select("restaurant_id")
          .eq("user_id", userInfo.user.id);
        const { data: restaurantFloorplans } = await supabase
          .from("uses_floorplan")
          .select("*")
          .eq("restaurant_id", restaurantInfo.restaurant_id);
        const { data: floorplanInfo } = await supabase
          .from("floorplan")
          .select("*")
          .eq(
            "floorplan_id",
            restaurantFloorplans.map((item) => item.floorplan_id),
          );
        console.log(floorplanInfo);
        setFloorplanData(floorplanInfo);
        setActiveFloorplan(
          restaurantFloorPlans.find((item) => item.is_active === true)
            ?.floorplan_id,
        );

        const restaurantFloorPlanChannel = supabase
          .channel("realtime_updates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "uses_floorplan",
              filter: `restaurant_id=eq.${restaurantInfo[0].restaurant_id}`,
            },
            (payload) => {
              switch (payload.eventType) {
                case "INSERT":
                  setFloorplanData((prev) => [...prev, payload.new]);
                  break;
                case "UPDATE":
                  setFloorplanData((prev) =>
                    prev.map((item) =>
                      item.reservation_id === payload.new.id
                        ? payload.new
                        : item,
                    ),
                  );
                  break;
                case "DELETE":
                  setFloorplanData((prev) =>
                    prev.filter(
                      (item) => item.reservation_id !== payload.old.id,
                    ),
                  );
                  break;
              }
            },
          )
          .subscribe();

        return () => supabase.removeChannel(restaurantFloorPlanChannel);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

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

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col rounded-md gap-4 p-5 h-full border">
      {activeFloorplan !== null ? (
        <div className="flex flex-row text-xl gap-3 h-[8%]">
          <div className="text-white">Active Floorplan</div>
          <Badge>
            {
              floorplanData.find(
                (item) => item.floorplan_id === activeFloorplan,
              )?.name
            }
          </Badge>
        </div>
      ) : (
        <div className="flex flex-row text-xl h-[8%]">
          <div className="text-white">No active floorplan</div>
        </div>
      )}

      <div className="flex flex-row h-[92%] space-x-4">
        <div className="flex flex-row w-full">
          {activeFloorplan === null ? (
            <div className="text-zinc-600 text-xs font-mono m-auto">
              No active floorplan.
            </div>
          ) : (
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
                      {floorplanData.find(
                        (item) => item.floorplan_id === activeFloorplan,
                      )?.configuration[cellId] ? (
                        renderComponent(
                          floorplanData.find(
                            (item) => item.floorplan_id === activeFloorplan,
                          )?.configuration[cellId],
                        )
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
          )}
        </div>
      </div>
    </div>
  );
}
