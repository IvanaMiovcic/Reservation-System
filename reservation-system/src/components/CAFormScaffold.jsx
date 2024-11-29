import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

async function getRestaurants() {
  try {
    let { data, error } = await supabase.from("restaurant").select("*");

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

const restaurants = await getRestaurants();

const schema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    "string.empty": "First Name is Required",
    "string.min": "First Name should be at least 2 characters long",
  }),
  lastname: Joi.string().min(2).required().messages({
    "string.empty": "Last Name is Required",
    "string.min": "Last Name should be at least 2 characters long",
  }),
  password: Joi.string()
    .min(8)
    .max(25)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-+=,.;'"/?<>{}]{8,}$/,
    )
    .required()
    .messages({
      "string.empty": "Password is Required",
      "string.pattern.base":
        "At least 8 characters with numbers, uppercase, lowercase, and special characters",
      "string.min":
        "At least 8 characters with numbers, uppercase, lowercase, and special characters",
    }),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email should be in a valid format",
      "string.empty": "Email is Required",
    }),
  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{4}$|^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be in one of two formats: 1234567890 or 123-456-7890",
      "string.empty": "Phone is Required",
    }),
  account_type: Joi.string()
    .valid("Customer", "Employee", "Manager")
    .required(),
  restaurant_id: Joi.string()
    .required()
    .messages({
      "string.empty": "Please choose the restaurant you work at.",
    })
    .when("account_type", {
      is: "Customer",
      then: Joi.string().optional().allow("").strip(),
    }),
});

export default function CAFormScaffold() {
  const navigate = useNavigate();
  const { toast } = useToast();

  async function onSubmit(form_data) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form_data.email,
        password: form_data.password,
        options: {
          data: {
            firstname: form_data.firstname,
            lastname: form_data.lastname,
            phone: form_data.phone,
            account_type: form_data.account_type,
          },
        },
      });
      if (error) {
        console.error(error);
        toast({
          title: "User account already exists!",
          description: "Try logging in instead.",
        });
      } else {
        if (form_data.restaurant_id) {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          const { data: dbData, error_worksAt } = await supabase
            .from("works_at")
            .insert([
              { user_id: user.id, restaurant_id: form_data.restaurant_id },
            ]);

          if (error_worksAt) {
            console.log(error_worksAt);
          } else {
            if (dbData) {
              if (data.user.user_metadata.account_type === "Customer") {
                navigate("/customer-home");
              } else {
                navigate("/employee-home");
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      repeat_password: "",
      email: "",
      phone: "",
      account_type: "Customer",
      restaurant_id: "",
    },
  });

  return (
    <div>
      <Toaster />
      <div className="font-poppins text-white space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-white text-start text-3xl sm:text-4xl">
              Welcome to SmartQ
            </div>
            <div className="flex flex-row gap-x-4 justify-evenly">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        className="border-zinc-600 focus:border-white"
                        placeholder="First Name"
                        {...field}
                        {...form.register("firstname")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        className="border-zinc-600 focus:border-white"
                        placeholder="Last Name"
                        {...field}
                        {...form.register("lastname")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-xs sm:text-sm">
                    <Input
                      className="border-zinc-600 focus:border-white"
                      placeholder="Email"
                      {...field}
                      {...form.register("email")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-xs sm:text-sm">
                    <Input
                      className="border-zinc-600 focus:border-white"
                      placeholder="Phone"
                      {...field}
                      {...form.register("phone")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-x-4 justify-evenly">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        className="border-zinc-600 focus:border-white"
                        placeholder="Password"
                        type="password"
                        {...field}
                        {...form.register("password")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeat_password"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl className="text-xs sm:text-sm">
                      <Input
                        className="border-zinc-600 focus:border-white"
                        type="password"
                        placeholder="Repeat Password"
                        {...field}
                        {...form.register("repeat_password")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="account_type"
              render={({ field }) => (
                <FormItem className="border-zinc-600 border rounded-md">
                  <FormControl>
                    <Tabs
                      defaultValue="Customer"
                      onValueChange={field.onChange}
                    >
                      <TabsList className="grid grid-cols-3 bg-black text-white">
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full text-xs sm:text-sm">
                            <TabsTrigger value="Customer">Customer</TabsTrigger>
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full text-xs sm:text-sm">
                            <TabsTrigger value="Employee">Employee</TabsTrigger>
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full text-xs sm:text-sm">
                            <TabsTrigger value="Manager">Manager</TabsTrigger>
                          </FormControl>
                        </FormItem>
                      </TabsList>
                      <TabsContent value="Employee">
                        <FormItem>
                          <FormControl>
                            <FormField
                              control={form.control}
                              name="restaurant_id"
                              render={({ field }) => (
                                <FormItem>
                                  <Popover>
                                    <PopoverTrigger asChild className="dark">
                                      <FormControl className="text-xs sm:text-sm flex w-full">
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "justify-between w-[98%] mx-auto mb-2",
                                            !field.value &&
                                              "text-muted-foreground",
                                          )}
                                        >
                                          {field.value
                                            ? restaurants.find(
                                                (restaurant) =>
                                                  restaurant.id === field.value,
                                              )?.name
                                            : "Pick a Restaurant"}
                                          <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="dark">
                                      <Command>
                                        <CommandInput placeholder="Search for a Restaurant" />
                                        <CommandList>
                                          <CommandEmpty>
                                            No restaurants found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {restaurants.map((restaurant) => (
                                              <CommandItem
                                                value={restaurant.name}
                                                key={restaurant.id}
                                                onSelect={() => {
                                                  form.setValue(
                                                    "restaurant_id",
                                                    restaurant.id,
                                                  );
                                                }}
                                              >
                                                {restaurant.name}
                                                <Check
                                                  className={cn(
                                                    "ml-auto",
                                                    restaurant.id ===
                                                      field.value
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      </TabsContent>
                      <TabsContent value="Manager">
                        <FormItem>
                          <FormControl>
                            <FormField
                              control={form.control}
                              name="restaurant_id"
                              render={({ field }) => (
                                <FormItem>
                                  <Popover>
                                    <PopoverTrigger asChild className="dark">
                                      <FormControl className="text-xs sm:text-sm flex w-full">
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "justify-between w-[98%] mx-auto mb-2",
                                            !field.value &&
                                              "text-muted-foreground",
                                          )}
                                        >
                                          {field.value
                                            ? restaurants.find(
                                                (restaurant) =>
                                                  restaurant.id === field.value,
                                              )?.name
                                            : "Pick a Restaurant"}
                                          <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="dark">
                                      <Command>
                                        <CommandInput placeholder="Search for a Restaurant" />
                                        <CommandList>
                                          <CommandEmpty>
                                            No restaurants found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {restaurants.map((restaurant) => (
                                              <CommandItem
                                                value={restaurant.name}
                                                key={restaurant.id}
                                                onSelect={() => {
                                                  form.setValue(
                                                    "restaurant_id",
                                                    restaurant.id,
                                                  );
                                                }}
                                              >
                                                {restaurant.name}
                                                <Check
                                                  className={cn(
                                                    "ml-auto",
                                                    restaurant.id ===
                                                      field.value
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      </TabsContent>
                    </Tabs>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full text-xs sm:text-sm"
              variant="secondary"
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Link to={"/log-in"}>
            <Button className="text-white text-xs" variant="link">
              Already have an account? Log in instead
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
