package mk.ukim.finki.wp.petcaresystem.service.domain.impl;
import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.repository.PetRepository;
import mk.ukim.finki.wp.petcaresystem.service.domain.PetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }

    @Override
    public List<Pet> findAll() {
        return petRepository.findAll();
    }

    @Override
    public Pet create(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public Optional<Pet> update(Long id, Pet pet) {
        return petRepository.findById(id)
                .map((existingPet)->{
                    existingPet.setName(pet.getName());
                    existingPet.setSpecies(pet.getSpecies());
                    existingPet.setBreed(pet.getBreed());
                    existingPet.setGender(pet.getGender());
                    existingPet.setBirthDate(pet.getBirthDate());
                    existingPet.setWeight(pet.getWeight());
                    return petRepository.save(existingPet);
                });
    }

    @Override
    public Optional<Pet> deleteById(Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        pet.ifPresent(petRepository::delete);
        return pet;
    }

    @Override
    public Page<Pet> findByOwnerId(Long id, Pageable pageable) {
        return petRepository.findByOwnerId(id,pageable);
    }
}
