import { z } from "zod";
import { loginSchema, signupSchema } from "./schema";

export type loginType = z.infer<typeof loginSchema>;
export type signupType = z.infer<typeof signupSchema>;
