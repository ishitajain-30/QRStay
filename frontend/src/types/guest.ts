export type GuestStatus =
  | "checked_in"
  | "checked_out"
  | "pending"
  | "cancelled";

export type VisitPurpose = "Business" | "Personal" | "Tourist";

export interface GuestFormData {
  id: string;
  fullName: string;
  mobileNumber: string;
  address: string;
  purposeofVisit: VisitPurpose;
  startDate: Date;
  endDate: Date;
  email: string;
  idProofNumber: string;
  hotelId: string;
  status: GuestStatus;
}

export interface Guest {
  _id: string;
  fullName: string;
  mobileNumber: string;
  address: string;
  purposeofVisit: VisitPurpose;
  startDate: Date;
  endDate: Date;
  email: string;
  idProofNumber: string;
  hotelId: string;
  status: GuestStatus;
}
