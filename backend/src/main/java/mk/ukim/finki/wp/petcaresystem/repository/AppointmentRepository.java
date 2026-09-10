package mk.ukim.finki.wp.petcaresystem.repository;

import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    @Query("""
    SELECT a
    FROM Appointment a
    WHERE a.pet.owner.id = :ownerId
    ORDER BY
        CASE
            WHEN a.status = mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus.SCHEDULED THEN 1
            WHEN a.status = mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus.FINISHED THEN 2
            WHEN a.status = mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus.CANCELLED THEN 3
        END,
        a.date ASC,
        a.time ASC
""")
    Page<Appointment> findByPetOwnerId(Long ownerId, Pageable pageable);

    Page<Appointment> findByStatusOrderByDateAscTimeAsc(
            AppointmentStatus status,Pageable pageable
    );
    boolean existsByDateAndTimeAndStatus(
            LocalDate date,
            LocalTime time,
            AppointmentStatus status
    );
}
