package mk.ukim.finki.wp.petcaresystem.model.dto;

import jakarta.validation.constraints.Positive;
import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import java.time.LocalDate;

public record CreatePetDto(
        String name,
        String species,
        String breed,
        String gender,
        LocalDate birthDate,
        @Positive
        Double weight
) {
    public Pet toPet(User owner){
        return new Pet(
                name,
                species,
                breed,
                gender,
                birthDate,
                weight,
                owner
        );
    }
}
