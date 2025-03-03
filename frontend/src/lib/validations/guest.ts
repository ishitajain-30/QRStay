import * as z from "zod";

export const guestSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    mobileNumber: z
      .string()
      .regex(/^\+?[1-9]\d{9,14}$/, "Invalid mobile number"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    purposeofVisit: z.enum(["Business", "Personal", "Tourist"], {
      required_error: "Please select a purpose",
    }),
    startDate: z.string().min(1, "Check-in date is required"),
    endDate: z.string().min(1, "Check-out date is required"),
    email: z.string().email("Invalid email address"),
    idProofNumber: z
      .string()
      .min(5, "ID proof number must be at least 5 characters"),
    status: z.enum(["checked_in", "checked_out", "pending", "cancelled"], {
      required_error: "Please select a status",
    }),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate >= startDate;
    },
    {
      message: "End date must be after Start date",
      path: ["End Date"],
    }
  );
