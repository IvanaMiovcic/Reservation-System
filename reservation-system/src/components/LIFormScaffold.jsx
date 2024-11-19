import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const schema = Joi.object({
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
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email should be in a valid format",
      "string.empty": "Email is Required",
    }),
});

export default function LIFormScaffold() {
  function onSubmit(data) {
    console.log(data);
  }
  const form = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  return (
    <div>
      <div className="font-poppins text-white space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-white text-start text-3xl sm:text-4xl">
              Log In
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-xs sm:text-sm">
                    <Input
                      className="border-zinc-400"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-xs sm:text-sm">
                    <Input
                      className="border-zinc-400"
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
            <Button
              className="w-full text-xs sm:text-sm"
              variant="secondary"
              type="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
        <div className="flex text-center">
          <Link to={"/create-account"}>
            <Button className="text-white text-xs" variant="link">
              Don&apos;t have an account? Create an account instead
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
