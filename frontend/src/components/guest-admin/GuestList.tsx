import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GuestViewDialog } from "./GuestViewDialog";
import { GuestEditDialog } from "./GuestEditDialog";
import { getStatusColor } from "@/lib/utils";
import type { Guest } from "@/types/guest";
import { bookingApi } from "@/lib/api/booking";
import { toast } from "sonner";

export function GuestList() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setIsLoading(true);
      const response = await bookingApi.getAll();
      console.log("GuestList:", response);

      if (!response) {
        throw new Error("No data received from server");
      }

      setGuests(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load guests");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading Guests...</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Guest List
        </CardTitle>
        <p className="text-sm text-gray-500">Manage guest bookings and stays</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No Guests found.
                  </TableCell>
                </TableRow>
              ) : (
                guests.map((guest) => (
                  <TableRow key={guest._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {guest.fullName}
                    </TableCell>
                    <TableCell>{guest.mobileNumber}</TableCell>
                    <TableCell>{guest.startDate.toString()}</TableCell>
                    <TableCell>{guest.endDate.toString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(guest.status)}
                      >
                        {guest.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() => {
                            setSelectedGuest(guest);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200"
                          onClick={() => {
                            setSelectedGuest(guest);
                            setIsEditOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <GuestViewDialog
          guest={selectedGuest}
          open={isViewOpen}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedGuest(null);
          }}
        />

        <GuestEditDialog
          guest={selectedGuest}
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedGuest(null);
          }}
        />
      </CardContent>
    </Card>
  );
}
