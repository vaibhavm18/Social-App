import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(12, "Title should be more than 12 char")
    .max(100, "Title shouldn't be more than 100 char"),

  description: z
    .string({ required_error: "Description is required" })
    .min(40, "Description should be more than 40 char")
    .max(4000, "Description shouldn't be more than 4000 char"),
});

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
