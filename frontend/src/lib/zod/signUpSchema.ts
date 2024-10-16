import { z } from "zod";

const signUpSchemaforOrganiser = z
  .object({
    username: z
      .string({ required_error: "Username is Required" })
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username can't be more than 20 characters long" }),

    organiserName: z
      .string({ required_error: "Organiser Name is required" })
      .min(3, { message: "Organiser Name must be at least 3 characters long" }),
    uemail: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),

    organiserPhone: z
      .string({ required_error: "Phone number is required!" })
      .regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, {
        message: "Invalid phone number format",
      }),

    organiserUpiId: z
      .string({ required_error: "UPI ID is required" })
      .regex(/^[\w\.\-_]{2,256}@[a-zA-Z]{2,64}$/, {
        message: "Invalid UPI ID format",
      }),

    upassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.upassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match!",
  });

const signUpSchemaforUser = z
  .object({
    username: z
      .string({ required_error: "Username is Required" })
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username can't be more than 20 characters long" }),

    uemail: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    upassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.upassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match!",
  });

export { signUpSchemaforOrganiser, signUpSchemaforUser };
