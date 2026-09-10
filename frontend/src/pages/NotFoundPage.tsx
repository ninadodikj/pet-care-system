import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="btn secondary">
        Back home
      </Link>
    </div>
  );
}
