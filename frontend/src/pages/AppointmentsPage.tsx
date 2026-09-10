import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    cancelAppointment,
    fetchMyAppointments,
    fetchScheduledAppointments,
    finishAppointment,
} from "../api/appointmentApi";
import { extractErrorMessage } from "../api/http";
import type { Appointment, AppointmentStatus } from "../types";

const STATUS_LABEL: Record<AppointmentStatus, string> = {
    SCHEDULED: "Scheduled",
    FINISHED: "Finished",
    CANCELLED: "Cancelled",
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
    return (
        <span className={`badge ${status.toLowerCase()}`}>
      <span className="status-dot"></span>
            {STATUS_LABEL[status] ?? status}
    </span>
    );
}

export default function AppointmentsPage() {
    const { isOwner, isVet } = useAuth();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busyId, setBusyId] = useState<number | null>(null);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 3;

    function load(pageNumber = page) {
        setLoading(true);

        const request = isVet
            ? fetchScheduledAppointments(pageNumber, pageSize)
            : fetchMyAppointments(pageNumber, pageSize);

        request
            .then((data) => {
                setAppointments(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((err) =>
                setError(
                    extractErrorMessage(
                        err,
                        "Couldn't load appointments."
                    )
                )
            )
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setPage(0);
    }, [isVet]);

    useEffect(() => {
        load(page);
    }, [page, isVet]);

    async function handleCancel(id: number) {
        if (!window.confirm("Cancel this appointment?")) return;

        setBusyId(id);

        try {
            await cancelAppointment(id);
            load();
        } catch (err) {
            setError(
                extractErrorMessage(err, "Cancelling failed.")
            );
        } finally {
            setBusyId(null);
        }
    }

    async function handleFinish(id: number) {
        setBusyId(id);

        try {
            await finishAppointment(id);
            load();
        } catch (err) {
            setError(
                extractErrorMessage(err, "Marking as finished failed.")
            );
        } finally {
            setBusyId(null);
        }
    }

    return (
        <div className="container">
            <div className="page-head">
                <div>
          <span className="page-eyebrow">
            {isVet ? "CLINIC SCHEDULE" : "YOUR PET'S CARE"}
          </span>

                    <h1>
                        {isVet
                            ? "Scheduled Appointments"
                            : "My Appointments"}
                    </h1>

                    <p>
                        {isVet
                            ? "Appointments booked by pet owners."
                            : "Keep track of your upcoming veterinary visits."}
                    </p>
                </div>

                {isOwner && (
                    <Link to="/appointments/new" className="btn">
                        <span>+</span> Book appointment
                    </Link>
                )}
            </div>

            {error && (
                <div className="alert-error">
                    <span>!</span>
                    {error}
                </div>
            )}

            {loading ? (
                <div className="loading-box">
                    <span className="loading-dot">🐾</span>
                    <p>Loading appointments...</p>
                </div>
            ) : appointments.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📅</div>

                    <h2>
                        {isVet
                            ? "No scheduled appointments"
                            : "No appointments yet"}
                    </h2>

                    <p>
                        {isVet
                            ? "There are currently no appointments waiting to be seen."
                            : "Book a veterinary appointment for one of your pets."}
                    </p>

                    {isOwner && (
                        <Link to="/appointments/new" className="btn">
                            Book an appointment
                        </Link>
                    )}
                </div>
            ) : (
                <>
                <div className="appointments-list">
                    {appointments.map((appt) => (
                        <div
                            className={`appointment-card status-${appt.status.toLowerCase()}`}
                            key={appt.id}
                        >
                            <div className="appointment-main">
                                <div className="appointment-pet">
                                    <div className="appointment-avatar">
                                        🐾
                                    </div>

                                    <div>
                                        <div className="appointment-title">
                                            {appt.petName}
                                            <span>{appt.species}</span>
                                        </div>

                                        {isVet && (
                                            <p className="appointment-owner">
                                                Owner: {appt.ownerName} {appt.ownerSurname}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <StatusBadge status={appt.status} />
                            </div>

                            <div className="appointment-info">
                                <div className="appointment-date">
                                    <span className="info-icon">📅</span>

                                    <div>
                                        <span className="info-label">Date</span>
                                        <strong>{appt.date}</strong>
                                    </div>
                                </div>

                                <div className="appointment-date">
                                    <span className="info-icon">🕐</span>

                                    <div>
                                        <span className="info-label">Time</span>
                                        <strong>
                                            {appt.time?.slice?.(0, 5) || appt.time}
                                        </strong>
                                    </div>
                                </div>

                                <div className="appointment-reason">
                                    <span className="info-icon">🩺</span>

                                    <div>
                                        <span className="info-label">Reason</span>
                                        <strong>{appt.reason}</strong>
                                    </div>
                                </div>
                            </div>

                            {appt.notes && (
                                <div className="appointment-notes">
                                    <span>Notes</span>
                                    <p>{appt.notes}</p>
                                </div>
                            )}

                            {isOwner && appt.status === "SCHEDULED" && (
                                <div className="appointment-actions">
                                    <Link
                                        to={`/appointments/${appt.id}/edit`}
                                        className="btn secondary"
                                    >
                                        Edit appointment
                                    </Link>

                                    <button
                                        className="btn danger"
                                        disabled={busyId === appt.id}
                                        onClick={() => handleCancel(appt.id)}
                                    >
                                        {busyId === appt.id
                                            ? "Cancelling..."
                                            : "Cancel"}
                                    </button>
                                </div>
                            )}

                            {isVet && appt.status === "SCHEDULED" && (
                                <div className="appointment-actions">
                                    <button
                                        className="btn"
                                        disabled={busyId === appt.id}
                                        onClick={() => handleFinish(appt.id)}
                                    >
                                        {busyId === appt.id
                                            ? "Saving..."
                                            : "✓ Mark as finished"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                disabled={page === 0}
                                onClick={() =>
                                    setPage((prev) => prev - 1)
                                }
                            >
                                ← Previous
                            </button>

                            <span className="pagination-info">
            Page {page + 1} of {totalPages}
        </span>

                            <button
                                className="pagination-btn"
                                disabled={page === totalPages - 1}
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
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
