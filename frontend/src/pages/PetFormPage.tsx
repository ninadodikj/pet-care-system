import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPet, fetchPetById, updatePet } from "../api/petApi";
import { extractErrorMessage } from "../api/http";
import type { PetPayload } from "../types";


interface PetFormState {
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string;
  weight: string;
}

const EMPTY_FORM: PetFormState = {
  name: "",
  species: "",
  breed: "",
  gender: "",
  birthDate: "",
  weight: "",
};

export default function PetFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<PetFormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit || !id) return;
    fetchPetById(id)
      .then((pet) =>
        setForm({
          name: pet.name || "",
          species: pet.species || "",
          breed: pet.breed || "",
          gender: pet.gender || "",
          birthDate: pet.birthDate || "",
          weight: pet.weight != null ? String(pet.weight) : "",
        })
      )
      .catch((err) => setError(extractErrorMessage(err, "Couldn't load this pet.")))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload: PetPayload = {
      name: form.name,
      species: form.species,
      breed: form.breed || null,
      gender: form.gender,
      birthDate: form.birthDate || null,
      weight: form.weight === "" ? null : Number(form.weight),
    };

    try {
      if (isEdit && id) {
        await updatePet(id, payload);
      } else {
        await createPet(payload);
      }
      navigate("/pets");
    } catch (err) {
      setError(extractErrorMessage(err, "Saving failed."));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="container">
      <h1>{isEdit ? "Edit pet" : "New pet"}</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="species">Species</label>
            <input
              id="species"
              name="species"
              placeholder="e.g. dog, cat"
              value={form.species}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="breed">Breed</label>
            <input id="breed" name="breed" value={form.breed} onChange={handleChange} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="" disabled>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="birthDate">Date of birth</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            min="0"
            value={form.weight}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => navigate("/pets")}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
