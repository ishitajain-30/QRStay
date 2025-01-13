// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Hotel Types
export interface CreateHotelRequest {
  name: string;
  logo: string;
  address: string;
  guestAdminData: {
    username: string;
    email: string;
    password: string;
  };
}

export interface UpdateHotelRequest {
  name?: string;
  logo?: string;
  address?: string;
}

// Booking Types
export interface CreateBookingRequest {
  fullName: string;
  mobileNumber: string;
  email: string;
  idProofNumber: string;
  address: string;
  purposeofVisit: string;
  startDate: Date;
  endDate: Date;
  hotelId: string;
}
