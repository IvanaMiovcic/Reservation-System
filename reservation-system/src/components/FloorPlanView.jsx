import React, { useState, useEffect } from "react";
import {
  TwoSeaterViewHori,
  TwoSeaterViewVerti,
} from "./tableView/TwoSeaterView";
import { FourSeaterView } from "./tableView/FourSeaterView";
import {
  SixSeaterViewHori,
  SixSeaterViewVerti,
} from "./tableView/SixSeaterView";
import { createClient } from "@supabase/supabase-js";
import { Badge } from "./ui/badge";
import LoadingPage from "./LoadingPage";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function FloorPlanView() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [floorplans, setFloorplans] = useState(null);
  const [floorplanData, setFloorplanData] = useState(null);

  useEffect(() => {
    let restaurantFloorPlanChannel;
    let floorPlanDataChannel;
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
          .eq("restaurant_id", restaurantInfo[0].restaurant_id);
        setFloorplans(restaurantFloorplans);

        const { data: floorplanInfo } = await supabase
          .from("floorplan")
          .select("*")
          .in(
            "floorplan_id",
            restaurantFloorplans.map((item) => item.floorplan_id),
          );
        setFloorplanData(floorplanInfo);

        restaurantFloorPlanChannel = supabase
          .channel("restaurantFloorplansUpdates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "uses_floorplan",
              filter: `restaurant_id=in.(${restaurantInfo[0].restaurant_id})`,
            },
            (payload) => {
              switch (payload.eventType) {
                case "INSERT":
                  setFloorplans((prev) => [...prev, payload.new]);

                  break;
                case "UPDATE":
                  setFloorplans((prev) =>
                    prev.map((item) =>
                      item.floorplan_id === payload.new.floorplan_id
                        ? payload.new
                        : item,
                    ),
                  );

                  break;
                case "DELETE":
                  setFloorplans((prev) =>
                    prev.filter(
                      (item) => item.floorplan_id !== payload.old.floorplan_id,
                    ),
                  );

                  break;
              }
            },
          )
          .subscribe();

        floorPlanDataChannel = supabase
          .channel("floorplanDataUpdates")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "floorplan",
              filter: `floorplan_id=in.(${restaurantFloorplans.map((item) => item.floorplan_id)})`,
            },
            (payload) => {
              switch (payload.eventType) {
                case "INSERT":
                  setFloorplanData((prev) => [...prev, payload.new]);
                  break;
                case "UPDATE":
                  setFloorplanData((prev) =>
                    prev.map((item) =>
                      item.floorplan_id === payload.new.floorplan_id
                        ? payload.new
                        : item,
                    ),
                  );
                  break;
                case "DELETE":
                  setFloorplanData((prev) =>
                    prev.filter(
                      (item) => item.floorplan_id !== payload.old.floorplan_id,
                    ),
                  );
                  break;
              }
            },
          )
          .subscribe();

        return () => {
          supabase.removeChannel(restaurantFloorPlanChannel);
          supabase.removeChannel(floorPlanDataChannel);
        };
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const renderComponent = (data) => {
    switch (data.table_type) {
      case "1":
        return <TwoSeaterViewHori tableID={data.table_id} />;

      case "2":
        return <TwoSeaterViewVerti tableID={data.table_id} />;

      case "3":
        return <FourSeaterView tableID={data.table_id} />;

      case "4":
        return <SixSeaterViewHori tableID={data.table_id} />;

      case "5":
        return <SixSeaterViewVerti tableID={data.table_id} />;

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
      {floorplans.find((item) => item.is_active === true) ? (
        <div className="flex flex-row text-xl gap-3 h-[8%]">
          <div className="text-white">Floor Status</div>
          <Badge>
            {
              floorplanData.find(
                (item) =>
                  item.floorplan_id ===
                  floorplans.find((item) => item.is_active === true)
                    ?.floorplan_id,
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
          {!floorplans.find((item) => item.is_active === true) ? (
            <div className="text-zinc-600 text-xs font-mono m-auto">
              No active floorplan.
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
                      {floorplanData.find(
                        (item) =>
                          item.floorplan_id ===
                          floorplans.find((item) => item.is_active === true)
                            ?.floorplan_id,
                      )?.configuration[cellId] ? (
                        renderComponent(
                          floorplanData.find(
                            (item) =>
                              item.floorplan_id ===
                              floorplans.find((item) => item.is_active === true)
                                ?.floorplan_id,
                          )?.configuration[cellId],
                        )
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
