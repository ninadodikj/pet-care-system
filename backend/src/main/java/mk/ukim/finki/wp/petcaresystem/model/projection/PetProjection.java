package mk.ukim.finki.wp.petcaresystem.model.projection;

import java.time.LocalDate;

public interface PetProjection {
    Long getId();
    String getName();
    String getSpecies();
    String getBreed();
    String getGender();
    LocalDate getBirthDate();
    Double  getWeight();
}
