package mk.ukim.finki.wp.petcaresystem.service.application;

import mk.ukim.finki.wp.petcaresystem.model.dto.CreateAppointmentDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayAppointmentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AppointmentApplicationService {

    Optional<DisplayAppointmentDto> findById(Long id);

    List<DisplayAppointmentDto> findAll();

    Page<DisplayAppointmentDto> findMyAppointments(
            String username, Pageable pageable
    );

    Page<DisplayAppointmentDto> findScheduledAppointments(Pageable pageable);

    DisplayAppointmentDto create(
            CreateAppointmentDto createAppointmentDto,
            String username
    );

    Optional<DisplayAppointmentDto> update(
            Long id,
            CreateAppointmentDto createAppointmentDto,
            String username
    );

    Optional<DisplayAppointmentDto> deleteById(
            Long id,
            String username
    );

    Optional<DisplayAppointmentDto> finish(Long id);
}