interface Job {
  // Previous fields
  id: string;
  artist: User;
  artistType: 'MASTER_ARTIST_TYPE';
  artistFlatRate: number;
  artistHourlyRate: number;
  backupArtists: User[];
  bookings: Booking[];
  boost: boolean;
  client: User;
  clientCompany: ClientCompany;
  clientEmail: string;
  clientFlatRate: number;
  clientHourlyRate: number;
  converted: boolean;
  dateDetails: string;
  description: string;
  direct: boolean;
  endDate: Date;
  hours: number;
  interestedArtists: InterestedArtist[];
  interestedArtistsUsers: User[];
  ages: AgeRange[];

  // New fields
  isHourly: boolean;
  link: string;
  location: string;
  masterServiceType: MASTER_SERVICE_TYPE;
  masterStyles: MASTER_STYLE_TYPE[];
  openRate: boolean;
  optionRateType: OptionRateType;
  optionsRecurringWeek: WeekDay[];
  outreachStatus: string;
  pro: boolean;
  requestStatus: RequestStatus;
  sameDay: boolean;
  sentTo: string[];
  sentToNetwork: boolean;
  sponsored: boolean;
  startDate: Date;
  status: BookingStatus;
  transportation: boolean;
  transportationDetails: string;
  
  // Metadata
  creator: User;
  modifiedDate: Date;
  createdDate: Date;
}

// New enums/types
enum MASTER_SERVICE_TYPE {
  // Add your service types here
  MAKEUP = 'MAKEUP',
  HAIR = 'HAIR',
  // ... etc
}

enum MASTER_STYLE_TYPE {
  // Add your style types here
  BRIDAL = 'BRIDAL',
  EDITORIAL = 'EDITORIAL',
  // ... etc
}

enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

enum OptionRateType {
  // Add your rate types here
  HOURLY = 'HOURLY',
  FLAT = 'FLAT',
  // ... etc
}

enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  // ... etc
}

enum BookingStatus {
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  // ... etc
} 