import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./FormField";
import type { GuestFormData, VisitPurpose } from "@/types/guest";

interface StayInfoFieldsProps {
  form: UseFormReturn<GuestFormData>;
}

export function StayInfoFields({ form }: StayInfoFieldsProps) {
  const {
    register,
    formState: { errors },
    // control,
    setValue,
    getValues,
  } = form;

  return (
    <div className="grid gap-6">
      <FormField
        label="Purpose of Visit"
        error={errors.purposeofVisit?.message}
      >
        <Select
          onValueChange={(value) =>
            setValue("purposeofVisit", value as VisitPurpose)
          }
          // control._formValues.purpose = value as any;
          value={getValues("purposeofVisit")}
          // }}
          // defaultValue="Personal"
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Tourist">Tourist</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Check-In" error={errors.startDate?.message}>
          <Input {...register("startDate")} type="date" className="bg-white" />
        </FormField>

        <FormField label="Check-Out" error={errors.endDate?.message}>
          <Input {...register("endDate")} type="date" className="bg-white" />
        </FormField>
      </div>
    </div>
  );
}
