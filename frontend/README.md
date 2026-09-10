# PetCare — React (TypeScript) frontend

A Vite + React + TypeScript app wired to your Spring Boot `pet-care-system` backend.

## Run it

```bash
npm install
cp .env.example .env      # adjust VITE_API_URL if needed
npm run dev
```

The app runs at `http://localhost:5173`. The backend is expected at
`http://localhost:8080` (already allowed in the backend's CORS config,
`http://localhost:*`).

Visit `http://localhost:5173` in your browser — **not** `:8080`, that port is
the API only and has no pages to render.

## Pages & roles

- **`/`** — public welcome/landing page with Login / Register in the navbar.
  Logged-in users are redirected straight to their dashboard.
- **Owner (`ROLE_USER`)** — registers via `/register`, then:
  - `/pets` — own pets only (`GET /api/pets/my`)
  - `/pets/new`, `/pets/:id/edit` — add/edit own pets
  - `/appointments` — own appointments (`GET /api/appointments/my`), booking, cancelling
- **Veterinarian (`ROLE_VETERINARIAN`)**:
  - `/appointments` — all scheduled appointments (`GET /api/appointments/scheduled`)
  - "Mark as finished" button (`PUT /api/appointments/{id}/finish`)

### How do I get a veterinarian account?

`POST /api/user/register` always creates a `ROLE_USER` (owner) — there's no
register-as-vet endpoint in the backend by design. To test the vet view,
register normally, then update the role directly in the database:

```sql
UPDATE users SET role = 'ROLE_VETERINARIAN' WHERE username = 'your_username';
```

(The table is `users`, the `role` column stores the `Role` enum as a string.)

## Structure

```
src/
  types.ts        Shared TS types mirroring the backend DTOs/enums
  api/            Typed axios instance + calls to /api/user, /api/pets, /api/appointments
  context/        AuthContext — token, current user, login/logout
  routes/         ProtectedRoute — locks pages down by role
  components/     Navbar (adapts to logged-out vs logged-in state)
  pages/          Landing, Login, Register, Pets (list/form), Appointments (list/form)
```

## Build

```bash
npm run build
```
Runs a TypeScript type-check (`tsc -b`) before the production Vite build.
