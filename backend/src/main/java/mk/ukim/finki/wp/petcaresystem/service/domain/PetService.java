package mk.ukim.finki.wp.petcaresystem.service.domain;

import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.model.projection.PetDetailedProjection;
import mk.ukim.finki.wp.petcaresystem.model.projection.PetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PetService {
    Optional<Pet> findById(Long id);
    List<Pet> findAll();
    Pet create(Pet pet);
    Optional<Pet> update(Long id, Pet pet);
    Optional<Pet> deleteById(Long id);
    Page<Pet> findByOwnerId(Long id, Pageable pageable);


}
