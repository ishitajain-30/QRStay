import { UseFormReturn } from "react-hook-form";
import { FormSection } from "./FormSection";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { StayInfoFields } from "./StayInfoFields";
import type { GuestFormData } from "@/types/guest";

interface GuestFormFieldsProps {
  form: UseFormReturn<GuestFormData>;
}

export function GuestFormFields({ form }: GuestFormFieldsProps) {
  return (
    <>
      <div className="space-y-8">
        <FormSection title="Personal Information">
          <PersonalInfoFields form={form} />
        </FormSection>

        <FormSection title="Stay Information">
          <StayInfoFields form={form} />
        </FormSection>
      </div>
    </>
  );
}
