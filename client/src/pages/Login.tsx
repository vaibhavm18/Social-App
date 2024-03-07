import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import Icon from "../components/ui/icon";
import { Input } from "../components/ui/input";

export const loginSchema = z.object({
  username: z
    .string()
    .min(6, "Minimum character length for username is 6")
    .max(12, "Maximum character length for username is 12"),
  password: z
    .string()
    .min(6, "Minimum character length for password is 6")
    .max(12, "Maximum character length for password is 12"),
});
const formField = ["username", "password"] as const;

type loginType = z.infer<typeof loginSchema>;

export default function Login() {
  const { setUser } = useAuthStore();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const onSubmit = (data: loginType) => {
    setUser({ _id: "123", token: "vaibhav123", username: "vaibhav123" });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 items-center w-full"
      >
        <div className="text-center">
          <p className="text-3xl font-bold mb-2">Login</p>
          <p className="text-xl font-semibold">
            Don&apos;t have an account ?{" "}
            <Icon
              link="/signup"
              className="text-blue-500 cursor-pointer hover:underline transition-all"
            >
              register
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
                    className="rounded-2xl"
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
  );
}
