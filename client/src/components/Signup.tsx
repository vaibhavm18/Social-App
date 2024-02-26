"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Icon from "./ui/icon";
import { Input } from "./ui/input";

export const signupSchema = z.object({
  email: z.string().email("Please add valid email."),
  username: z
    .string()
    .min(6, "Minimum character length for username is 6")
    .max(12, "Maximum character length for username is 12"),
  password: z
    .string()
    .min(6, "Minimum character length for password is 6")
    .max(12, "Maximum character length for password is 12"),
});
const formField = ["email", "username", "password"] as const;

type signupType = z.infer<typeof signupSchema>;

export default function Signup() {
  const form = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = (data: signupType) => {
    console.log("data", data);
  };
  return (
    <div className="bg-[#1e2030] text-[#BCD1EF]  max-w-lg w-full border-white border shadow-blur backdrop-blur-lg py-8 px-8 rounded-3xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 items-center w-full"
        >
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">Signup</p>
            <p className="text-xl font-semibold">
              Already have an account ?{" "}
              <Icon
                link="/login"
                className="text-blue-500 cursor-pointer hover:underline transition-all"
              >
                register here
              </Icon>
            </p>
          </div>

          {formField.map((label) => (
            <FormField
              key={label}
              control={form.control}
              name={label}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-xl">{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={label + "..."}
                      {...field}
                      className="rounded-2xl text-lg md:text-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="rounded-xl"
            // disabled={mutation.isPending ? true : false}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
