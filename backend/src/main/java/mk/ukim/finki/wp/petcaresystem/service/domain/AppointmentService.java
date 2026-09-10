package mk.ukim.finki.wp.petcaresystem.service.domain;
import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {

    Optional<Appointment> findById(Long id);
    List<Appointment> findAll();

    Appointment create(Appointment appointment);
    Optional<Appointment> update(Long id, Appointment appointment);
    Optional<Appointment> deleteById(Long id);

    Page<Appointment> findByOwnerId(Long ownerId, Pageable pageable);

    Page<Appointment> findByStatus(AppointmentStatus status,Pageable pageable);
    Optional<Appointment> finish(Long id);

    boolean existsByDateAndTimeAndStatus(
            LocalDate date,
            LocalTime time,
            AppointmentStatus status
    );
}
