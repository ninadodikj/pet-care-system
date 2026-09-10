package mk.ukim.finki.wp.petcaresystem.service.application.impl;

import mk.ukim.finki.wp.petcaresystem.model.domain.Appointment;
import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import mk.ukim.finki.wp.petcaresystem.model.dto.CreateAppointmentDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayAppointmentDto;
import mk.ukim.finki.wp.petcaresystem.model.enums.AppointmentStatus;
import mk.ukim.finki.wp.petcaresystem.model.exception.UserNotFoundException;
import mk.ukim.finki.wp.petcaresystem.service.application.AppointmentApplicationService;
import mk.ukim.finki.wp.petcaresystem.service.domain.AppointmentService;
import mk.ukim.finki.wp.petcaresystem.service.domain.PetService;
import mk.ukim.finki.wp.petcaresystem.service.domain.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentApplicationServiceImpl
        implements AppointmentApplicationService {

    private final AppointmentService appointmentService;
    private final PetService petService;
    private final UserService userService;

    public AppointmentApplicationServiceImpl(
            AppointmentService appointmentService,
            PetService petService,
            UserService userService
    ) {
        this.appointmentService = appointmentService;
        this.petService = petService;
        this.userService = userService;
    }

    @Override
    public Optional<DisplayAppointmentDto> findById(Long id) {

        return appointmentService
                .findById(id)
                .map(DisplayAppointmentDto::from);
    }

    @Override
    public List<DisplayAppointmentDto> findAll() {

        return DisplayAppointmentDto.from(
                appointmentService.findAll()
        );
    }

    @Override
    public Page<DisplayAppointmentDto> findMyAppointments(
            String username, Pageable pageable
    ) {

        User currentUser = getUser(username);

        return appointmentService
                .findByOwnerId(currentUser.getId(), pageable)
                .map(DisplayAppointmentDto::from);
    }

    @Override
    public Page<DisplayAppointmentDto> findScheduledAppointments(Pageable pageable) {

        return appointmentService
                .findByStatus(
                        AppointmentStatus.SCHEDULED,
                        pageable
                )
                .map(DisplayAppointmentDto::from);
    }

    @Override
    public DisplayAppointmentDto create(
            CreateAppointmentDto createAppointmentDto,
            String username
    ) {

        User currentUser = getUser(username);

        Pet pet = petService
                .findById(createAppointmentDto.petId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Pet not found"
                        )
                );

        checkPetOwnership(pet, currentUser);
        boolean alreadyBooked =
                appointmentService.existsByDateAndTimeAndStatus(
                        createAppointmentDto.date(),
                        createAppointmentDto.time(),
                        AppointmentStatus.SCHEDULED
                );

        if (alreadyBooked) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "This appointment time is already booked"
            );
        }

        Appointment appointment =
                createAppointmentDto.toAppointment(pet);

        return DisplayAppointmentDto.from(
                appointmentService.create(appointment)
        );
    }

    @Override
    public Optional<DisplayAppointmentDto> update(
            Long id,
            CreateAppointmentDto createAppointmentDto,
            String username
    ) {

        User currentUser = getUser(username);

        Appointment existingAppointment =
                appointmentService.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Appointment not found"
                                )
                        );

        checkAppointmentOwnership(
                existingAppointment,
                currentUser
        );

        Pet pet = petService
                .findById(createAppointmentDto.petId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Pet not found"
                        )
                );

        checkPetOwnership(pet, currentUser);

        Appointment updatedAppointment =
                createAppointmentDto.toAppointment(pet);

        return appointmentService
                .update(id, updatedAppointment)
                .map(DisplayAppointmentDto::from);
    }

    @Override
    public Optional<DisplayAppointmentDto> deleteById(
            Long id,
            String username
    ) {

        User currentUser = getUser(username);

        Appointment appointment =
                appointmentService.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Appointment not found"
                                )
                        );

        checkAppointmentOwnership(
                appointment,
                currentUser
        );

        return appointmentService
                .deleteById(id)
                .map(DisplayAppointmentDto::from);
    }

    @Override
    public Optional<DisplayAppointmentDto> finish(Long id) {

        return appointmentService
                .finish(id)
                .map(DisplayAppointmentDto::from);
    }

    private User getUser(String username) {

        return userService
                .findByUsername(username)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found"
                        )
                );
    }

    private void checkPetOwnership(
            Pet pet,
            User user
    ) {

        if (!pet.getOwner().getId().equals(user.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not the owner of this pet"
            );
        }
    }

    private void checkAppointmentOwnership(
            Appointment appointment,
            User user
    ) {

        if (!appointment.getPet()
                .getOwner()
                .getId()
                .equals(user.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not the owner of this appointment"
            );
        }
    }
}