package mk.ukim.finki.wp.petcaresystem.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "appointments")
public class Appointment extends BaseAuditableEntity {

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;


    public Appointment(LocalDate date, LocalTime time, String reason,
                       AppointmentStatus status, String notes,
                       Pet pet) {
        this.date = date;
        this.time = time;
        this.reason = reason;
        this.status = status;
        this.notes = notes;
        this.pet = pet;
    }
}