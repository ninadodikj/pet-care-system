import { http } from "./http";
import type { Pet, PetPayload } from "../types";


export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// GET /api/pets/my — only the logged-in owner's pets
export function fetchMyPets(page:number,size:number): Promise<PageResponse<Pet>> {
  return http.get<PageResponse<Pet>>("/api/pets/my",{params:{page,size},}).then((r) => r.data);
}

// GET /api/pets/{id} — backend returns 403 if it isn't yours
export function fetchPetById(id: number | string): Promise<Pet> {
  return http.get<Pet>(`/api/pets/${id}`).then((r) => r.data);
}

// POST /api/pets/add — owner is taken from the JWT on the backend
export function createPet(payload: PetPayload): Promise<Pet> {
  return http.post<Pet>("/api/pets/add", payload).then((r) => r.data);
}

// PUT /api/pets/{id}/edit
export function updatePet(id: number | string, payload: PetPayload): Promise<Pet> {
  return http.put<Pet>(`/api/pets/${id}/edit`, payload).then((r) => r.data);
}

// DELETE /api/pets/{id}/delete
export function deletePet(id: number | string): Promise<Pet> {
  return http.delete<Pet>(`/api/pets/${id}/delete`).then((r) => r.data);
}
