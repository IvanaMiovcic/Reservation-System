import Joi from "joi";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { cn } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import LoadingPage from "./LoadingPage";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

const schema = Joi.object({
  reservation_date: Joi.date().required().messages({
    "date.base": "Please choose a reservation date",
  }),
  reservation_time: Joi.string().required().messages({
    "string.empty": "Please choose a reservation time",
  }),
  priority: Joi.string().required().messages({
    "string.empty": "Please choose a reservation priority",
  }),
  additional_info: Joi.string().optional().allow(""),
});

export default function ModRFormScaffold() {
  const location = useLocation();
  const { reservation_id } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const { data: userInfo, error: user_error } =
          await supabase.auth.getUser();

        if (user_error) {
          navigate("/log-in");
        }

        if (userInfo.user.user_metadata.account_type !== "Customer") {
          navigate("/employee-home");
        } else {
          setUserData(userInfo);
        }

        const { data: reservationInfo, error: reservation_error } =
          await supabase
            .from("has_reservation")
            .select("*")
            .eq("reservation_id", reservation_id);

        if (reservation_error) {
          console.log(reservation_error);
        } else {
          setReservationData(reservationInfo);
        }

        const { data: restaurantName, error: restaurant_error } = await supabase
          .from("restaurant")
          .select("name")
          .eq("id", reservationInfo[0].restaurant_id);

        if (restaurant_error) {
          console.log(restaurant_error);
        } else {
          setRestaurantData(restaurantName);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  function getTimestampz(date, time) {
    const dateObj = new Date(date);
    const [hours, minutes, seconds] = time.split(":");
    const combinedDateTime = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      hours,
      minutes,
      seconds || "00",
    );

    return combinedDateTime.toISOString();
  }

  async function onSubmit(formData) {
    const datetime = getTimestampz(
      formData.reservation_date,
      formData.reservation_time,
    );

    try {
      const { error } = await supabase
        .from("has_reservation")
        .update([
          {
            date_time: datetime,
            priority: formData.priority,
            additional_info: formData.additional_info,
          },
        ])
        .eq("reservation_id", reservation_id);

      if (error) {
        console.log(error);
      } else {
        navigate("/customer-home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      reservation_date: "",
      reservation_time: "",
      priority: "",
      additional_info: "",
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="font-poppins text-white space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-white text-start text-3xl sm:text-4xl">
              Modify {restaurantData[0].name} Reservation
            </div>
            <FormField
              control={form.control}
              name="reservation_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Reservation Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="dark">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[100%] pl-3 text-left font-normal",
                            !field.value,
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a reservation date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[100%] border p-0 dark"
                      align="center"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reservation_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reservation Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-zinc-800 ">
                        <SelectValue placeholder="Pick a reservation time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark">
                      <SelectItem value="16:00:00">4:00 PM</SelectItem>
                      <SelectItem value="16:30:00">4:30 PM</SelectItem>
                      <SelectItem value="17:00:00">5:00 PM</SelectItem>
                      <SelectItem value="17:30:00">5:30 PM</SelectItem>
                      <SelectItem value="18:00:00">6:00 PM</SelectItem>
                      <SelectItem value="18:30:00">6:30 PM</SelectItem>
                      <SelectItem value="19:00:00">7:00 PM</SelectItem>
                      <SelectItem value="19:30:00">7:30 PM</SelectItem>
                      <SelectItem value="20:00:00">8:00 PM</SelectItem>
                      <SelectItem value="20:30:00">8:30 PM</SelectItem>
                      <SelectItem value="21:00:00">9:00 PM</SelectItem>
                      <SelectItem value="21:30:00">9:30 PM</SelectItem>
                      <SelectItem value="22:00:00">10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-zinc-800">
                        <SelectValue placeholder="Pick a reservation priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_info"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl className="text-xs sm:text-sm">
                    <Textarea
                      placeholder={reservationData[0].additional_info}
                      className="border-zinc-600 focus:border-white resize-none"
                      {...field}
                      {...form.register("additional_info")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full text-xs sm:text-sm"
              variant="secondary"
              type="submit"
            >
              Modify Reservation
            </Button>
          </form>
        </Form>
        <div className="text-center"></div>
      </div>
    </div>
  );
}
