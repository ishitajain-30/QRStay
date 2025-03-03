import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GuestRegistrationForm } from "./GuestRegistrationForm";
import type { Hotel } from "@/types/hotel";
import type { Guest } from "@/types/guest";

interface RegistrationSheetProps {
  hotel: Hotel | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (guestData: Guest) => void;
}

export function RegistrationSheet({
  hotel,
  open,
  onClose,
  onSuccess,
}: RegistrationSheetProps) {
  if (!hotel) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Register at {hotel.name}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <GuestRegistrationForm
            hotelId={hotel._id}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
