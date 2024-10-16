import { z } from "zod";

const organiserProfileSchema = z
  .object({
   
    organiserName: z
      .string({ required_error: "Organiser Name is required" })
      .min(3, { message: "Organiser Name must be at least 3 characters long" }),
    
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

  })


export { organiserProfileSchema };
