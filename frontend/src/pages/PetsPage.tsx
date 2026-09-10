import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePet, fetchMyPets } from "../api/petApi";
import { extractErrorMessage } from "../api/http";
import type { Pet } from "../types";

function calculateAge(birthDate: string | null): string | null {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const diffMs = Date.now() - birth.getTime();
    const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    return years < 1
        ? `${Math.max(1, Math.round(years * 12))} mo.`
        : `${Math.floor(years)} yr.`;
}

function getPetEmoji(species: string): string {
    const value = species.toLowerCase();

    if (value.includes("dog") || value.includes("куче")) return "🐶";
    if (value.includes("cat") || value.includes("мач")) return "🐱";
    if (value.includes("rabbit") || value.includes("зајак")) return "🐰";
    if (value.includes("bird") || value.includes("птиц")) return "🐦";

    return "🐾";
}

export default function PetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 6;

    function load(pageNumber = page) {
        setLoading(true);

        fetchMyPets(pageNumber, pageSize)
            .then((data) => {
                setPets(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) =>
                setError(
                    extractErrorMessage(
                        err,
                        "Couldn't load your pets."
                    )
                )
            )
            .finally(() => setLoading(false));
    }
    useEffect(()=>{load(page);
    },[page]);

    async function handleDelete(id: number, name: string) {
        if (!window.confirm(`Delete ${name}? This can't be undone.`)) return;

        try {
            await deletePet(id);
            setPets((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError(extractErrorMessage(err, "Delete failed."));
        }
    }

    return (
        <div className="container">
            <div className="page-head">
                <div>
                    <span className="page-eyebrow">YOUR COMPANIONS</span>
                    <h1>My Pets</h1>
                    <p>Keep track of all your pets in one place.</p>
                </div>

                <Link to="/pets/new" className="btn">
                    <span>+</span> Add pet
                </Link>
            </div>

            {error && <p className="error-text">{error}</p>}

            {loading ? (
                <div className="loading-box">
                    <span className="loading-dot">🐾</span>
                    <p>Loading your pets...</p>
                </div>
            ) : pets.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🐾</div>
                    <h2>No pets yet</h2>
                    <p>
                        Add your first pet to start keeping track of their information and
                        appointments.
                    </p>

                    <Link to="/pets/new" className="btn">
                        Add your first pet
                    </Link>
                </div>
            ) : (
                <>
                <div className="pets-grid">
                    {pets.map((pet) => (
                        <div className="pet-card" key={pet.id}>
                            <div className="pet-card-top">
                                <div className="pet-avatar">
                                    {getPetEmoji(pet.species)}
                                </div>

                                <div className="pet-info">
                                    <h2>{pet.name}</h2>

                                    <p>
                                        {pet.species}
                                        {pet.breed ? ` · ${pet.breed}` : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="pet-details">
                                {pet.birthDate && (
                                    <div className="pet-detail">
                                        <span className="detail-icon">🎂</span>
                                        <div>
                                            <span className="detail-label">Age</span>
                                            <strong>{calculateAge(pet.birthDate)}</strong>
                                        </div>
                                    </div>
                                )}

                                {pet.weight && (
                                    <div className="pet-detail">
                                        <span className="detail-icon">⚖️</span>
                                        <div>
                                            <span className="detail-label">Weight</span>
                                            <strong>{pet.weight} kg</strong>
                                        </div>
                                    </div>
                                )}

                                <div className="pet-detail">
                                    <span className="detail-icon">♀</span>
                                    <div>
                                        <span className="detail-label">Gender</span>
                                        <strong>{pet.gender}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="pet-card-actions">
                                <Link
                                    to={`/pets/${pet.id}/edit`}
                                    className="btn secondary"
                                >
                                    Edit pet
                                </Link>

                                <button
                                    className="icon-btn danger"
                                    onClick={() => handleDelete(pet.id, pet.name)}
                                    title={`Delete ${pet.name}`}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                disabled={page === 0}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                ← Previous
                            </button>

                            <span className="pagination-info">
            Page {page + 1} of {totalPages}
        </span>

                            <button
                                className="pagination-btn"
                                disabled={page === totalPages - 1}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}