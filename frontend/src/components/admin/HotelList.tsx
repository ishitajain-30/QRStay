import { useEffect, useState } from "react";
import { QrCode, Trash2, Plus, Building2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeDialog } from "@/components/admin/QRCodeDialog";
import { AddHotelForm } from "@/components/admin/AddHotelForm";
import type { Hotel } from "@/types/hotel";
import { toast } from "sonner";
import { hotelApi } from "@/lib/api/hotel";

export function HotelList() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setIsLoading(true);

      const response = await hotelApi.getAll();
      console.log(response);

      if (!response) {
        throw new Error("No data received from server");
      }

      setHotels(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load hotels");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await hotelApi.delete(id);
      toast.success("Hotel deleted successfully");
      loadHotels();
    } catch (error) {
      console.error("Failed to delete hotel:", error);
      toast.error("Failed to delete hotel");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hotels
            </CardTitle>
            <p className="text-sm text-gray-500">
              Manage your hotel properties
            </p>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30">
                <Plus className="h-4 w-4 mr-2" />
                Add Hotel
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl">
              <SheetHeader>
                <SheetTitle className="flex items-center text-xl font-semibold text-gray-800">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  Add New Hotel
                </SheetTitle>
              </SheetHeader>
              <AddHotelForm
                onSuccess={() => {
                  setIsSheetOpen(false);
                  loadHotels();
                }}
              />
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No hotels found. Add your first hotel to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  hotels.map((hotel) => (
                    <TableRow key={hotel._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
                          <img
                            src={hotel.logo}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {hotel.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {hotel.address}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                            onClick={() => setSelectedHotel(hotel)}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => handleDelete(hotel._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <QRCodeDialog
        hotel={selectedHotel}
        onClose={() => setSelectedHotel(null)}
      />
    </div>
  );
}
