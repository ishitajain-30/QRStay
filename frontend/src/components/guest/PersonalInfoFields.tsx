import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import type { GuestFormData } from "@/types/guest";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<GuestFormData>;
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Full Name" error={errors.fullName?.message}>
          <Input
            {...register("fullName")}
            placeholder="John Doe"
            className="bg-white"
          />
        </FormField>

        <FormField label="Mobile Number" error={errors.mobileNumber?.message}>
          <Input
            {...register("mobileNumber")}
            placeholder="+1 (555) 000-0000"
            className="bg-white"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="bg-white"
          />
        </FormField>

        <FormField
          label="ID Proof Number"
          error={errors.idProofNumber?.message}
        >
          <Input
            {...register("idProofNumber")}
            placeholder="ID123456789"
            className="bg-white"
          />
        </FormField>
      </div>

      <FormField label="Address" error={errors.address?.message}>
        <Input
          {...register("address")}
          placeholder="123 Street Name, City, Country"
          className="bg-white"
        />
      </FormField>
    </div>
  );
}
