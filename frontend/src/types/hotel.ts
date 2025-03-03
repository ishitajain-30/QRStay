export interface Hotel {
  _id: string;
  name: string;
  address: string;
  logo: string;
}

export interface HotelFormData {
  name: string;
  address: string;
  logo: FileList;
  username: string;
  email: string;
  password: string;
}
