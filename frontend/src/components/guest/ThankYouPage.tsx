import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Guest } from "@/types/guest";

interface ThankYouPageProps {
  guest: Guest;
  onClose: () => void;
}

export function ThankYouPage({ guest, onClose }: ThankYouPageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg border-0 shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for registering, {guest.fullName}. Your booking has been
            confirmed.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-medium text-gray-900 mb-3">Booking Details:</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Check-in:</span>{" "}
                {guest.startDate.toString()}
              </p>
              <p>
                <span className="text-gray-600">Check-out:</span>{" "}
                {guest.endDate.toString()}
              </p>
              <p>
                <span className="text-gray-600">Booking ID:</span> {guest._id}
              </p>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Back to Hotels
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
