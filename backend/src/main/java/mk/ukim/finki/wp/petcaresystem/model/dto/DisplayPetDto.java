package mk.ukim.finki.wp.petcaresystem.model.dto;

import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;

import java.time.LocalDate;
import java.util.List;

public record DisplayPetDto(
        Long id,
        String name,
        String species,
        String breed,
        String gender,
        LocalDate birthDate,
        Double weight,
        Long ownerId
) {
    public static DisplayPetDto from(Pet pet) {
        return new DisplayPetDto(
                pet.getId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getGender(),
                pet.getBirthDate(),
                pet.getWeight(),
                pet.getOwner().getId()
        );
    }
    public static List<DisplayPetDto> from(List<Pet> pets){
        return pets
                .stream()
                .map(DisplayPetDto::from)
                .toList();
    }

}
