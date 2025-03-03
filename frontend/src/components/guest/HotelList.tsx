import { Building2, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Hotel } from "@/types/hotel";
import { useEffect, useState } from "react";
import { hotelApi } from "@/lib/api/hotel";
import { toast } from "sonner";

interface HotelListProps {
  onRegister: (hotelId: string) => void;
}

export function HotelList({ onRegister }: HotelListProps) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading hotels...</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Available Hotels
          </span>
        </CardTitle>
        <p className="text-sm text-gray-500">
          Select a hotel to register as a guest
        </p>
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
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>{hotel.address}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                        onClick={() => {
                          onRegister(hotel._id);
                        }}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
