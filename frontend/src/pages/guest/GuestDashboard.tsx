import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HotelList } from "@/components/guest/HotelList";
import { RegistrationSheet } from "@/components/guest/RegistrationSheet";
import { ThankYouPage } from "@/components/guest/ThankYouPage";
import type { Hotel } from "@/types/hotel";
import type { Guest } from "@/types/guest";
import { hotelApi } from "@/lib/api/hotel";
import { toast } from "sonner";

export function GuestDashboard() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registeredGuest, setRegisteredGuest] = useState<Guest | null>(null);

  const handleRegister = async (hotelId: string) => {
    try {
      const response = await hotelApi.getOne(hotelId);

      if (!response) {
        throw new Error("Hotel not found");
      }

      setSelectedHotel(response);
      setIsRegistrationOpen(true);
    } catch (error) {
      console.error("Failed to fetch hotel details:", error);
      toast.error("Failed to load hotel details");
    }
  };

  const handleRegistrationSuccess = (guestData: Guest) => {
    if (selectedHotel) {
      setRegisteredGuest(guestData);
      setIsRegistrationOpen(false);
    }
  };

  const resetFlow = () => {
    setSelectedHotel(null);
    setRegisteredGuest(null);
  };

  if (registeredGuest) {
    return (
      <DashboardLayout title="Registration Successful">
        <ThankYouPage guest={registeredGuest} onClose={resetFlow} />
      </DashboardLayout>
    );
  }

  return (
    <div className="w-screen">
      <DashboardLayout title="Guest Registration">
        <div className="max-w-7xl mx-auto">
          <HotelList onRegister={handleRegister} />

          <RegistrationSheet
            hotel={selectedHotel}
            open={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
            onSuccess={handleRegistrationSuccess}
          />
        </div>
      </DashboardLayout>
    </div>
  );
}
