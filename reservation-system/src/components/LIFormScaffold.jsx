import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

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
  const navigate = useNavigate();

  async function onSubmit(form_data) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form_data.email,
        password: form_data.password,
      });

      if (data.session) {
        console.log("login success");
      }

      if (error) {
        console.log(error);
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user.user_metadata.account_type === "Customer") {
          navigate("/customer-home");
        } else {
          navigate("/employee-home");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
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
              Login
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
              name="password"
              render={({ field }) => (
                <FormItem>
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
