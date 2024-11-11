import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const schema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    "string.empty": "First Name is Required",
    "string.min": "First Name should be at least 2 characters long",
  }),
  lastname: Joi.string().min(2).messages({
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
        "Password should be at least 12 characters long, and contain numbers, uppercase letters, lowercae letters, and special characters",
      "string.min":
        "Password should be at least 12 characters long, and contain numbers, uppercase letters, lowercae letters, and special characters",
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
    .optional()
    .messages({
      "string.empty": "",
      "string.pattern.base":
        "Phone number must match either XXXXXXXXXX or XXX-XXX-XXXX",
    }),
});

export default function FormScaffold() {
  function onSubmit(data) {
    data.preventDefault();
    console.log(data.firstname);
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
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 font-poppins"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    {...form.register("firstname")}
                  />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    {...form.register("lastname")}
                  />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormDescription>This is your email address</FormDescription>
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
                <FormDescription>This is your phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    {...form.register("password")}
                  />
                </FormControl>
                <FormDescription>This is your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeat_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat Password"
                    {...field}
                    {...form.register("repeat_password")}
                  />
                </FormControl>
                <FormDescription>Re-enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Account</Button>
        </form>
      </Form>
    </div>
  );
}
