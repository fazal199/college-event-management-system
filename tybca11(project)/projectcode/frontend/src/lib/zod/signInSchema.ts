import { z } from "zod";

const signInSchema = z.object({
  uemail: z
    .string({ required_error: "Email is required!" })
    .email({ message: "Invalid email address!" }),

  upassword: z
    .string({ required_error: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

export default signInSchema;
