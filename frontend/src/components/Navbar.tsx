import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, isOwner, isVet, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Pet<span className="brand-mark">Care</span>
        </NavLink>

        {isAuthenticated ? (
          <>
            <nav className="nav-links">
              {isOwner && (
                <>
                  <NavLink to="/pets" className={({ isActive }) => (isActive ? "active" : "")}>
                    My Pets
                  </NavLink>
                  <NavLink
                    to="/appointments"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    My Appointments
                  </NavLink>
                </>
              )}
              {isVet && (
                <NavLink
                  to="/appointments"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Scheduled Appointments
                </NavLink>
              )}
            </nav>

            <div className="nav-user">
              {user && (
                <>
                  <span>
                    {user.name} {user.surname}
                  </span>
                  <span className="role-tag">{isVet ? "Veterinarian" : "Owner"}</span>
                  <button className="btn ghost" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="nav-user">
            <NavLink to="/login" className="btn ghost">
              Log in
            </NavLink>
            <NavLink to="/register" className="btn">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
