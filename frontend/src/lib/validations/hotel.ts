import * as z from "zod";

export const hotelSchema = z.object({
  name: z.string().min(2, "Hotel name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  logo: z.any(),
  username: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
