import { Post, createPost } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

const fields = ["title", "description"] as const;

export default function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (post: Post) => createPost(post),
    onSuccess(_data) {
      form.setValue("title", "");
      form.setValue("description", "");
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-[#030712] m-2 space-y-8 py-4 px-2 sm:px-6 flex flex-col items-stretch h-full gap-4 "
      >
        {fields.map((val) => (
          <FormField
            key={val}
            control={form.control}
            name={val}
            render={({ field }) => (
              <FormItem
                className={`${
                  val === "description" ? "flex-auto" : ""
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
        <Button
          type="submit"
          className="rounded-xl"
          disabled={isPending ? true : false}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
