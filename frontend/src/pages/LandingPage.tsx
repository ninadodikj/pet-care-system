import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">RECORDS · APPOINTMENTS · CARE</p>
        <h1>Welcome to PetCare</h1>
        <p className="hero-lede">
          One place to keep your pets' records and book appointments with your vet —
          simple for owners, organized for veterinarians.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn">
            Get started
          </Link>
          <Link to="/login" className="btn secondary">
            Log in
          </Link>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Your pets, your records</h3>
          <p>Add every pet you own and keep their details in one tidy card.</p>
        </div>
        <div className="feature-card">
          <h3>Book appointments</h3>
          <p>Schedule a visit for any of your pets and track its status.</p>
        </div>
        <div className="feature-card">
          <h3>For veterinarians</h3>
          <p>See scheduled appointments at a glance and mark visits as finished.</p>
        </div>
      </section>
    </>
  );
}
