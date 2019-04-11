export interface Ride {
  _id?: object;
  driver: string;
  riders?: string;
  destination: string;
  origin: string;
  roundTrip: boolean;
  departureDate: string;
  departureTime: string;
  creationTime?: string;
  driving?: boolean;
  notes: string;
  sortDateTime?: string;
  sortCreationTime?: string;
}
