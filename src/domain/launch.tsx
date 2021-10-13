export default interface Launch {
    id: string;
    name: string;
    date_local: Date;
    date_utc: string;
    upcoming: boolean;
    success: boolean;
    flight_number: number
  }