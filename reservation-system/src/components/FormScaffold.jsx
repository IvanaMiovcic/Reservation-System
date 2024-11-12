import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const schema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    "string.empty": "First Name is Required",
    "string.min": "First Name should be at least 2 characters long",
  }),
  lastname: Joi.string().min(2).allow("").optional().messages({
    "string.empty": "Last Name is Required",
    "string.min": "Last Name should be at least 2 characters long",
  }),
  password: Joi.string()
    .min(8)
    .max(25)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-+=,.;'"/?<>{}]{12,}$/,
    )
    .required()
    .messages({
      "string.empty": "Password is Required",
      "string.pattern.base":
        "Password should be at least 12 characters long, and contain numbers, uppercase letters, lowercase letters, and special characters",
      "string.min":
        "Password should be at least 12 characters long, and contain numbers, uppercase letters, lowercase letters, and special characters",
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
    .allow("")
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be in one of two formats: 1234567890 or 123-456-7890",
    }),
  account_type: Joi.string()
    .valid("customer", "employee", "manager")
    .required(),
});

export default function FormScaffold() {
  function onSubmit(data) {
    console.log(data);
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
      account_type: "customer",
    },
  });

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 font-poppins text-white"
          >
            <div className="text-white text-4xl">Welcome to SmartQ</div>
            <div className="flex flex-row gap-x-4 justify-evenly">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input
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
                    <FormControl>
                      <Input
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
                  <FormControl>
                    <Input
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
                  <FormControl>
                    <Input
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
                    <FormControl>
                      <Input
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
                    <FormControl>
                      <Input
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
                <FormItem className="border rounded-md">
                  <FormControl>
                    <Tabs
                      defaultValue="customer"
                      onValueChange={field.onChange}
                    >
                      <TabsList className="grid grid-cols-3 bg-black text-white">
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full">
                            <TabsTrigger value="customer">Customer</TabsTrigger>
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full">
                            <TabsTrigger value="employee">Employee</TabsTrigger>
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex justify-center">
                          <FormControl className="w-full">
                            <TabsTrigger value="manager">Manager</TabsTrigger>
                          </FormControl>
                        </FormItem>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" variant="secondary" type="submit">
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
