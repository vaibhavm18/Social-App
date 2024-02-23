"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  Title: z
    .string({ required_error: "Title is required" })
    .min(12, "Title should be more than 12 char")
    .max(40, "Title shouldn't be more than 40 char"),

  Description: z
    .string({ required_error: "Description is required" })
    .min(40, "Description should be more than 40 char")
    .max(500, "Description shouldn't be more than 500 char"),
});

const fields = ["Title", "Description"] as const;

export default function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Hello God!", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-4 px-2 sm:px-6 flex flex-col items-stretch h-full gap-4 border border-red-950"
      >
        {fields.map((val) => (
          <FormField
            key={val}
            control={form.control}
            name={val}
            render={({ field }) => (
              <FormItem
                className={`${
                  val === "Description" ? "flex-auto" : ""
                } flex flex-col`}
              >
                <FormLabel className="text-xl font-bold">{val}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    {...field}
                    className="resize-none rounded-xl flex-auto"
                  />
                </FormControl>
                <FormMessage className="pt-2 p-1" />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="rounded-xl">
          Submit
        </Button>
      </form>
    </Form>
  );
}
