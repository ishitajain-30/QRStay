import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GuestFormFields } from "@/components/guest/GuestFormFields";
import { guestSchema } from "@/lib/validations/guest";
import type { Guest, GuestFormData, GuestStatus } from "@/types/guest";
import { bookingApi } from "@/lib/api/booking";

interface GuestEditDialogProps {
  guest: Guest | null;
  open: boolean;
  onClose: () => void;
}

export function GuestEditDialog({
  guest,
  open,
  onClose,
}: GuestEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GuestFormData & { status: GuestStatus }>({
    resolver: zodResolver(guestSchema),
  });

  useEffect(() => {
    if (guest) {
      form.reset({
        fullName: guest.fullName,
        mobileNumber: guest.mobileNumber,
        email: guest.email,
        idProofNumber: guest.idProofNumber,
        address: guest.address,
        purposeofVisit: guest.purposeofVisit,
        startDate: guest.startDate,
        endDate: guest.endDate,
        status: guest.status,
      });
      console.log("Guest Details:", guest);
      console.log("Status:", guest.status);
    }
  }, [guest, form]);

  const onSubmit = async (data: GuestFormData & { status: GuestStatus }) => {
    if (!guest) return;

    try {
      setIsSubmitting(true);

      const response = await bookingApi.update(guest ? guest._id : "", {
        ...data,
        hotelId: guest?.hotelId,
      });
      console.log("Update Data:", response);

      if (!response) {
        throw new Error("Failed to update guest details");
      }

      toast.success("Guest details updated successfully");
      onClose();
    } catch (error: any) {
      console.error("Failed to update guest:", error);
      toast.error(
        "Failed to update guest details: " + error.response.data.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!guest) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Guest Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                onValueChange={(value) =>
                  form.setValue("status", value as GuestStatus)
                }
                // defaultValue={guest.status}
                value={form.getValues("status")}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                  <SelectItem value="checked_out">Checked Out</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <GuestFormFields form={form} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
