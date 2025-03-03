import { useRef } from "react";
import { Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Guest } from "@/types/guest";

interface GuestViewDialogProps {
  guest: Guest | null;
  open: boolean;
  onClose: () => void;
}

export function GuestViewDialog({
  guest,
  open,
  onClose,
}: GuestViewDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Guest Details - ${guest?.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  if (!guest) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div ref={printRef} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Full Name</div>
              <div>{guest.fullName}</div>
            </div>
            <div>
              <div className="font-semibold">Mobile Number</div>
              <div>{guest.mobileNumber}</div>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <div>{guest.email}</div>
            </div>
            <div>
              <div className="font-semibold">ID Proof Number</div>
              <div>{guest.idProofNumber}</div>
            </div>
            <div className="col-span-2">
              <div className="font-semibold">Address</div>
              <div>{guest.address}</div>
            </div>
            <div>
              <div className="font-semibold">Purpose of Visit</div>
              <div>{guest.purposeofVisit}</div>
            </div>
            <div>
              <div className="font-semibold">Stay Duration</div>
              <div>
                {guest.startDate.toString()} to {guest.endDate.toString()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <DialogTitle className="flex justify-between items-center">
          <span>Guest Details</span>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </DialogTitle>
      </DialogFooter>
    </Dialog>
  );
}
