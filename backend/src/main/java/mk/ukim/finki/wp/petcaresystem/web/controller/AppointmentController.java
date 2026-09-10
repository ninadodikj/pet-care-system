package mk.ukim.finki.wp.petcaresystem.web.controller;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.petcaresystem.model.dto.CreateAppointmentDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayAppointmentDto;
import mk.ukim.finki.wp.petcaresystem.service.application.AppointmentApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentApplicationService appointmentApplicationService;

    public AppointmentController(
            AppointmentApplicationService appointmentApplicationService
    ) {
        this.appointmentApplicationService = appointmentApplicationService;
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public DisplayAppointmentDto findById(
            @PathVariable Long id
    ) {
        return appointmentApplicationService
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found")
                );
    }

    // Get all appointments
    @GetMapping
    public List<DisplayAppointmentDto> findAll() {
        return appointmentApplicationService.findAll();
    }

    // Owner: get my appointments
    @GetMapping("/my")
    public Page<DisplayAppointmentDto> findMyAppointments(
            Authentication authentication, Pageable pageable
            ) {
        return appointmentApplicationService.findMyAppointments(
                authentication.getName(),pageable
        );
    }

    // Veterinarian: get scheduled appointments
    @GetMapping("/scheduled")
    public Page<DisplayAppointmentDto> findScheduledAppointments(Pageable pageable) {
        return appointmentApplicationService
                .findScheduledAppointments(pageable);
    }

    // Owner: create appointment
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DisplayAppointmentDto create(
            @Valid @RequestBody CreateAppointmentDto createAppointmentDto,
            Authentication authentication
    ) {
        return appointmentApplicationService.create(
                createAppointmentDto,
                authentication.getName()
        );
    }

    // Owner: update appointment
    @PutMapping("/{id}")
    public DisplayAppointmentDto update(
            @PathVariable Long id,
            @Valid @RequestBody CreateAppointmentDto createAppointmentDto,
            Authentication authentication
    ) {
        return appointmentApplicationService
                .update(
                        id,
                        createAppointmentDto,
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found")
                );
    }

    // Owner: delete/cancel appointment
    @DeleteMapping("/{id}")
    public DisplayAppointmentDto delete(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return appointmentApplicationService
                .deleteById(
                        id,
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found")
                );
    }

    // Veterinarian: mark appointment as finished
    @PutMapping("/{id}/finish")
    public DisplayAppointmentDto finish(
            @PathVariable Long id
    ) {
        return appointmentApplicationService
                .finish(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found")
                );
    }
}

