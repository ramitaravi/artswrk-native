export type UserRole = 'artist' | 'client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string; // This could be computed from firstName + lastName
  email: string;
  role: UserRole;
  slug: string;
  createdAt: Date;
  modifiedAt: Date;
} 