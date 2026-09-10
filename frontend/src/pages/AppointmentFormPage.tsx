import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyPets } from "../api/petApi";
import {
    createAppointment,
    fetchAppointmentById,
    updateAppointment,
} from "../api/appointmentApi";
import { extractErrorMessage } from "../api/http";
import type { AppointmentPayload, Pet } from "../types";

interface AppointmentFormState {
    petId: string;
    date: string;
    time: string;
    reason: string;
    notes: string;
}

const EMPTY_FORM: AppointmentFormState = {
    petId: "",
    date: "",
    time: "",
    reason: "",
    notes: "",
};

export default function AppointmentFormPage() {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [pets, setPets] = useState<Pet[]>([]);
    const [form, setForm] = useState<AppointmentFormState>(EMPTY_FORM);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // We don't need pagination here.
        // We need the pets for the dropdown.
        const petsPromise = fetchMyPets(0, 100);

        const apptPromise =
            isEdit && id
                ? fetchAppointmentById(id)
                : Promise.resolve(null);

        Promise.all([petsPromise, apptPromise])
            .then(([petsPage, appt]) => {
                const myPets = petsPage.content;

                setPets(myPets);

                if (appt) {
                    setForm({
                        petId: String(appt.petId),
                        date: appt.date || "",
                        time: (appt.time || "").slice(0, 5),
                        reason: appt.reason || "",
                        notes: appt.notes || "",
                    });
                } else if (myPets.length > 0) {
                    setForm((f) => ({
                        ...f,
                        petId: String(myPets[0].id),
                    }));
                }
            })
            .catch((err) =>
                setError(
                    extractErrorMessage(
                        err,
                        "Couldn't load the data."
                    )
                )
            )
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        const payload: AppointmentPayload = {
            date: form.date,
            time: form.time,
            reason: form.reason,
            notes: form.notes || null,
            petId: Number(form.petId),
        };

        try {
            if (isEdit && id) {
                await updateAppointment(id, payload);
            } else {
                await createAppointment(payload);
            }

            navigate("/appointments");
        } catch (err) {
            setError(
                extractErrorMessage(
                    err,
                    "Saving failed."
                )
            );
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <p className="loading-text">Loading...</p>;
    }

    if (pets.length === 0) {
        return (
            <div className="container">
                <h1>Book appointment</h1>

                <div className="empty-state">
                    <p>
                        Add a pet first so you can book an appointment for it.
                    </p>

                    <button
                        className="btn secondary"
                        onClick={() => navigate("/pets/new")}
                    >
                        Add a pet
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>
                {isEdit
                    ? "Edit appointment"
                    : "Book appointment"}
            </h1>

            <form
                className="form-card"
                onSubmit={handleSubmit}
            >
                <div className="field">
                    <label htmlFor="petId">Pet</label>

                    <select
                        id="petId"
                        name="petId"
                        value={form.petId}
                        onChange={handleChange}
                        required
                    >
                        {pets.map((pet) => (
                            <option
                                key={pet.id}
                                value={pet.id}
                            >
                                {pet.name} ({pet.species})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-row">
                    <div className="field">
                        <label htmlFor="date">Date</label>

                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="time">Time</label>

                        <input
                            id="time"
                            name="time"
                            type="time"
                            value={form.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="reason">
                        Reason for visit
                    </label>

                    <input
                        id="reason"
                        name="reason"
                        placeholder="e.g. routine vaccination"
                        value={form.reason}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="notes">
                        Notes (optional)
                    </label>

                    <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                    />
                </div>

                {error && (
                    <p className="error-text">
                        {error}
                    </p>
                )}

                <div className="form-actions">
                    <button
                        className="btn"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Saving..."
                            : "Save"}
                    </button>

                    <button
                        type="button"
                        className="btn ghost"
                        onClick={() =>
                            navigate("/appointments")
                        }
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}