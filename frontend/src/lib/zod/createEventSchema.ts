import { z } from "zod";

const createEventSchema = z.object({
  name: z.string({ 
    required_error: "Event name is required.",
  }),
  location: z.string({ 
    required_error: "Location is required.",
  }),
  speakers: z.string({ required_error: "Speaker's Name are required." }),
  date: z
    .string({
      required_error: "Date and time are required.",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date and time format.",
    }), 
    // datetime-local will return a string, so we validate that it's parsable

  description: z 
    .string({
      required_error: "Description is required!",
    })
    .min(10, "Description must be at least 10 characters long."),
  address: z.string({//address
    required_error: "Address is required!",
  }),
  capacity: z
    .string({
      required_error: "Capacity is required.",
    }),
  ticketprice: z.string({required_error: "Ticket Price is Required!"}),
  eventthumbnail: z.any({
    required_error: "File is required.",
  }), 
  category: z.string({
    required_error: "Category selection is required.",
  }),
  language: z.string({
    required_error: "Language selection is required.",
  }),
});

export default createEventSchema;
