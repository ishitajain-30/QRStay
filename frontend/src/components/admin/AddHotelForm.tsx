import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelSchema } from "@/lib/validations/hotel";
import type { HotelFormData } from "@/types/hotel";
import { hotelApi } from "@/lib/api/hotel";

interface AddHotelFormProps {
  onSuccess: () => void;
}

export function AddHotelForm({ onSuccess }: AddHotelFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setLogoBase64(base64String);
      setLogoPreview(base64String);
    } catch (error) {
      console.error("Error converting file to base64:", error);
      toast.error("Failed to process the image");
    }
  };

  const onSubmit = async (data: HotelFormData) => {
    if (!logoBase64) {
      toast.error("Please upload a hotel logo");
      return;
    }

    try {
      setIsLoading(true);

      const response = await hotelApi.create({
        name: data.name,
        logo: logoBase64,
        address: data.address,
        guestAdminData: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });

      console.log(response);

      toast.success("Hotel added successfully");
      reset();
      setLogoBase64(null);
      setLogoPreview(null);
      onSuccess();
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error("Failed to add hotel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Hotel Name</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              {...register("name")}
              id="name"
              className="pl-10 bg-white"
              placeholder="Enter hotel name"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">User Name</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              {...register("username")}
              id="username"
              className="pl-10 bg-white"
              placeholder="Enter User Name"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              {...register("email")}
              id="email"
              className="pl-10 bg-white"
              placeholder="Enter Email ID"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              {...register("password")}
              id="password"
              type="password"
              className="pl-10 bg-white"
              placeholder="Enter Password"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            {...register("address")}
            id="address"
            className="bg-white"
            placeholder="Enter hotel address"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo</Label>
          <div className="flex items-center space-x-4">
            <Input
              {...register("logo")}
              type="file"
              id="logo"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border-2 h-24 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              onClick={() => document.getElementById("logo")?.click()}
            >
              <div className="flex flex-col items-center space-y-2">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Hotel logo preview"
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-600">Upload Logo</span>
                  </>
                )}
              </div>
            </Button>
          </div>
          {errors.logo && (
            <p className="text-sm text-red-500">{errors.logo.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white min-w-[120px]"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Hotel"}
        </Button>
      </div>
    </form>
  );
}
