package mk.ukim.finki.wp.petcaresystem.model.dto;

public record PetFilter(
        String species,
        String breed,
        String gender,
        Long ownerId
) {
}
