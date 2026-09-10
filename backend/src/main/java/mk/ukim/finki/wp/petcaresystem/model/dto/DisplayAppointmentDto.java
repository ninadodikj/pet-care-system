package mk.ukim.finki.wp.petcaresystem.model.dto;

import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record DisplayAppointmentDto(
        Long id,
        LocalDate date,
        LocalTime time,
        String reason,
        AppointmentStatus status,
        String notes,
        Long petId,
        String petName,
        String species,
        String ownerName,
        String ownerSurname
) {
    public static DisplayAppointmentDto from(Appointment appointment) {
        return new DisplayAppointmentDto(
                appointment.getId(),
                appointment.getDate(),
                appointment.getTime(),
                appointment.getReason(),
                appointment.getStatus(),
                appointment.getNotes(),
                appointment.getPet().getId(),
                appointment.getPet().getName(),
                appointment.getPet().getSpecies(),

                appointment.getPet().getOwner().getName(),
                appointment.getPet().getOwner().getSurname()
        );
    }
    public static List<DisplayAppointmentDto> from(List<Appointment> appointments){
        return appointments
                .stream()
                .map(DisplayAppointmentDto::from)
                .toList();
    }
}
