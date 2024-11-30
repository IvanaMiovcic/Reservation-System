import Joi from "joi";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

function promiseDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Redirecting...");
      resolve();
    }, ms);
  });
}

const schema = Joi.object({
  notif_text: Joi.string().required().messages({
    "string.empty": "Notification text cannot be empty",
  }),
});

export default function EmailScaffold(props) {
  const userID = props.userID;
  const restaurantID = props.restaurantID;
  const navigate = useNavigate();

  const { toast } = useToast();

  async function onSubmit(formData) {
    try {
      const { data, error } = await supabase
        .from("got_notification")
        .insert([
          {
            user_id: userID,
            restaurant_id: restaurantID,
            notif_content: formData.notif_text,
          },
        ])
        .select();
      if (error) {
        console.log(error);
        toast({
          title: "Unable to send notification!",
          description: "Something went wrong. Try again later.",
        });
      }
      if (data) {
        console.log("Notification sent successfully!");
        toast({
          title: "Update sent successfully!",
          description:
            "You will be redirect back to the dashboard in a few seconds.",
        });
        await promiseDelay(6000);
        navigate("/employee-home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      notif_text: "",
    },
  });

  return (
    <div>
      <Toaster />
      <div className="font-poppins text-white space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-white text-start text-3xl sm:text-4xl">
              Notify Customer
            </div>
            <FormField
              control={form.control}
              name="notif_text"
              render={({ field }) => (
                <FormItem className="w-[100%]">
                  <FormLabel>Notification Text</FormLabel>
                  <FormControl className="text-xs sm:text-sm">
                    <Textarea
                      className="border-zinc-600 focus:border-white resize-none"
                      {...field}
                      {...form.register("notif_text")}
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
              Send Notification
            </Button>
          </form>
        </Form>
        <div className="text-center"></div>
      </div>
    </div>
  );
}
