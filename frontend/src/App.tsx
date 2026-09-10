import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PetsPage from "./pages/PetsPage";
import PetFormPage from "./pages/PetFormPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AppointmentFormPage from "./pages/AppointmentFormPage";
import NotFoundPage from "./pages/NotFoundPage";

function Root() {
  const { isAuthenticated, isOwner, isVet, loading } = useAuth();

  if (loading) return <p className="loading-text">Loading...</p>;

  // Logged-in visitors get sent straight to their dashboard;
  // everyone else sees the welcome/landing page.
  if (isAuthenticated) {
    if (isOwner) return <Navigate to="/pets" replace />;
    if (isVet) return <Navigate to="/appointments" replace />;
  }

  return <LandingPage />;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Owner-only */}
        <Route
          path="/pets"
          element={
            <ProtectedRoute role="ROLE_USER">
              <PetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/new"
          element={
            <ProtectedRoute role="ROLE_USER">
              <PetFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:id/edit"
          element={
            <ProtectedRoute role="ROLE_USER">
              <PetFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/new"
          element={
            <ProtectedRoute role="ROLE_USER">
              <AppointmentFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/:id/edit"
          element={
            <ProtectedRoute role="ROLE_USER">
              <AppointmentFormPage />
            </ProtectedRoute>
          }
        />

        {/* Shared between owner and vet — the page adapts by role */}
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
