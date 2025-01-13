import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GuestFormFields } from "./GuestFormFields";
import { guestSchema } from "@/lib/validations/guest";
import type { GuestFormData } from "@/types/guest";
import { bookingApi } from "@/lib/api/booking";
import type { Guest } from "@/types/guest";

interface GuestRegistrationFormProps {
  hotelId: string;
  onSuccess: (guestDat: Guest) => void;
  onCancel: () => void;
}

export function GuestRegistrationForm({
  hotelId,
  onSuccess,
  onCancel,
}: GuestRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      purposeofVisit: "Personal",
    },
  });

  const onSubmit = async (data: GuestFormData) => {
    try {
      setIsSubmitting(true);
      const response = await bookingApi.create({
        ...data,
        hotelId,
      });

      // console.log("Guest Registeration Form Details:", response);

      if (!response || !response._id) {
        throw new Error("Invalid response from server");
      }

      toast.success("Registration successful");
      onSuccess(response);
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error("Registration failed: " + error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <GuestFormFields form={form} />

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
}
