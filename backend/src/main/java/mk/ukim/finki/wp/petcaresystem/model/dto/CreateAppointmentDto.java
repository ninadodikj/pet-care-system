package mk.ukim.finki.wp.petcaresystem.model.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateAppointmentDto(
        @NotNull
        @FutureOrPresent
        LocalDate date,
        @NotNull
        LocalTime time,
        @NotBlank
        String reason,
        AppointmentStatus status,
        String notes,
        @NotNull
        Long petId
) {
    public Appointment toAppointment(Pet pet) {
        return new Appointment(
                date,
                time,
                reason,
                AppointmentStatus.SCHEDULED,
                notes,
                pet
        );
    }
}
