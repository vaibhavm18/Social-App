import { signup } from "@/api";
import { signupSchema } from "@/lib/schema";
import { signupType } from "@/lib/type";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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

const formField = ["email", "username", "password"] as const;

export default function Signup() {
  const { setUser } = useAuthStore();
  const form = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: signupType) => await signup(data),
    onSuccess(data: { token: string; user: { id: string; username: string } }) {
      setUser({
        id: data.user.id,
        token: data.token,
        username: data.user.username,
      });
    },
    onError(error) {
      console.log("error", error);
    },
  });
  const onSubmit = (data: signupType) => {
    console.log("data", data);
    mutate(data);
  };
  return (
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
              login
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
          disabled={isPending ? true : false}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
