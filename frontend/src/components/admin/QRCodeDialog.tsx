import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Hotel } from "@/types/hotel";

interface QRCodeDialogProps {
  hotel: Hotel | null;
  onClose: () => void;
}

export function QRCodeDialog({ hotel, onClose }: QRCodeDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (hotel) {
      generateQRCode();
    }
  }, [hotel]);

  const generateQRCode = async () => {
    if (!hotel) return;

    try {
      const url = `${window.location.origin}/guest?hotelId=${hotel._id}`;
      const qrCode = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${hotel?.name}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={!!hotel} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for {hotel?.name}</DialogTitle>
        </DialogHeader>
        {qrCodeUrl && (
          <div className="flex flex-col items-center space-y-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
