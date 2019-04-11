export interface Ride {
  _id?: object;
  driver: string;
  riders?: string;
  destination: string;
  origin: string;
  roundTrip: boolean;
  departureDate: string;
  departureTime: string;
  driving?: boolean;
  notes: string;
  sortDateTime?: string;
  NoSmoking: boolean;
  Eco: boolean;
  PetFriendly: boolean;
}
