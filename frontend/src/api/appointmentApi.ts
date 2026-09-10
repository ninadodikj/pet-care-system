import { http } from "./http";
import type { Appointment, AppointmentPayload } from "../types";

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// GET /api/appointments/my — owner's own appointments
export function fetchMyAppointments(
    page: number,
    size: number
): Promise<PageResponse<Appointment>> {
    return http
        .get<PageResponse<Appointment>>("/api/appointments/my", {
            params: {
                page,
                size,
            },
        })
        .then((r) => r.data);
}

// GET /api/appointments/scheduled — for the veterinarian
export function fetchScheduledAppointments(
    page: number,
    size: number
): Promise<PageResponse<Appointment>> {
    return http
        .get<PageResponse<Appointment>>(
            "/api/appointments/scheduled",
            {
                params: {
                    page,
                    size,
                },
            }
        )
        .then((r) => r.data);
}

// GET /api/appointments/{id}
export function fetchAppointmentById(id: number | string): Promise<Appointment> {
  return http.get<Appointment>(`/api/appointments/${id}`).then((r) => r.data);
}

// POST /api/appointments
export function createAppointment(payload: AppointmentPayload): Promise<Appointment> {
  return http.post<Appointment>("/api/appointments", payload).then((r) => r.data);
}

// PUT /api/appointments/{id}
export function updateAppointment(
  id: number | string,
  payload: AppointmentPayload
): Promise<Appointment> {
  return http.put<Appointment>(`/api/appointments/${id}`, payload).then((r) => r.data);
}

// DELETE /api/appointments/{id}
export function cancelAppointment(id: number | string): Promise<Appointment> {
  return http.delete<Appointment>(`/api/appointments/${id}`).then((r) => r.data);
}

// PUT /api/appointments/{id}/finish — veterinarian only
export function finishAppointment(id: number | string): Promise<Appointment> {
  return http.put<Appointment>(`/api/appointments/${id}/finish`).then((r) => r.data);
}
