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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(12, "Title should be more than 12 char")
    .max(40, "Title shouldn't be more than 40 char"),

  description: z
    .string({ required_error: "Description is required" })
    .min(40, "Description should be more than 40 char")
    .max(500, "Description shouldn't be more than 500 char"),
});

const fields = ["title", "description"] as const;

export default function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Hello God!", values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((val) => (
          <FormField
            key={val}
            control={form.control}
            name={val}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{val}</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
