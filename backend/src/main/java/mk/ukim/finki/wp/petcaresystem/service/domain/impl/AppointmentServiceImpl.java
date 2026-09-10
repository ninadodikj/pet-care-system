package mk.ukim.finki.wp.petcaresystem.service.domain.impl;

import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;
import mk.ukim.finki.wp.petcaresystem.repository.AppointmentRepository;
import mk.ukim.finki.wp.petcaresystem.service.domain.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment create(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Optional<Appointment> update(Long id, Appointment appointment) {
        return appointmentRepository.findById(id)
                .map((existingApp)->{
                    existingApp.setDate(appointment.getDate());
                    existingApp.setTime(appointment.getTime());
                    existingApp.setReason(appointment.getReason());
                    existingApp.setNotes(appointment.getNotes());
                    existingApp.setPet(appointment.getPet());
                    return appointmentRepository.save(existingApp);
                });
    }

    @Override
    public Optional<Appointment> deleteById(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        appointment.ifPresent(appointmentRepository::delete);
        return appointment;
    }

    @Override
    public Page<Appointment> findByOwnerId(Long ownerId, Pageable pageable) {
        return appointmentRepository.findByPetOwnerId(ownerId,pageable);
    }

    @Override
    public Page<Appointment> findByStatus(AppointmentStatus status,Pageable pageable) {
        return appointmentRepository.findByStatusOrderByDateAscTimeAsc(status,pageable);
    }

    @Override
    public Optional<Appointment> finish(Long id) {
        return appointmentRepository.findById(id)
                .map(appointment -> {

                    appointment.setStatus(
                            AppointmentStatus.FINISHED
                    );

                    return appointmentRepository.save(
                            appointment
                    );
                });
    }
    @Override
    public boolean existsByDateAndTimeAndStatus(
            LocalDate date,
            LocalTime time,
            AppointmentStatus status
    ) {
        return appointmentRepository.existsByDateAndTimeAndStatus(
                date,
                time,
                status
        );
    }
}
