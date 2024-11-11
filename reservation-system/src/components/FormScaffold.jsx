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
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const schema = Joi.object({
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%&^*()-+=/?<>,.]{12,30}"))
    .required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(new RegExp("^d{3}-d{3}-d{4}$|^d{10}$")),
}).with("firstname", "lastname");

function FormScaffold() {
  const onSubmit = (data) => console.log(data);
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
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default FormScaffold;
