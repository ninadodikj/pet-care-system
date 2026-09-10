export type Role = "ROLE_USER" | "ROLE_VETERINARIAN";

export type AppointmentStatus = "SCHEDULED" | "FINISHED" | "CANCELLED";

// Mirrors RegisterUserResponseDto, also returned by GET /api/user/me
export interface CurrentUser {
    id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
}

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}

// Mirrors DisplayPetDto
export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string | null;
  gender: string;
  birthDate: string | null; // ISO date, e.g. "2022-05-01"
  weight: number | null;
  ownerId: number;
}

// Mirrors CreatePetDto (owner is derived from the JWT on the backend)
export interface PetPayload {
  name: string;
  species: string;
  breed?: string | null;
  gender: string;
  birthDate?: string | null;
  weight?: number | null;
}

// Mirrors DisplayAppointmentDto
export interface Appointment {
  id: number;
  date: string; // ISO date
  time: string; // "HH:mm:ss" or "HH:mm"
  reason: string;
  status: AppointmentStatus;
  notes: string | null;
  petId: number;
  petName: string;
  species: string;
  ownerName: string;
  ownerSurname: string;
}

// Mirrors CreateAppointmentDto
export interface AppointmentPayload {
  date: string;
  time: string;
  reason: string;
  notes?: string | null;
  petId: number;
}
