package mk.ukim.finki.wp.petcaresystem.service.application.impl;
import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import mk.ukim.finki.wp.petcaresystem.model.dto.CreatePetDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayPetDto;
import mk.ukim.finki.wp.petcaresystem.model.exception.UserNotFoundException;
import mk.ukim.finki.wp.petcaresystem.service.application.PetApplicationService;
import mk.ukim.finki.wp.petcaresystem.service.domain.PetService;
import mk.ukim.finki.wp.petcaresystem.service.domain.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetApplicationServiceImpl implements PetApplicationService {
    private final PetService petService;
    private final UserService userService;

    public PetApplicationServiceImpl(PetService petService, UserService userService) {
        this.petService = petService;
        this.userService = userService;
    }

    @Override
    public Optional<DisplayPetDto> findById(Long id) {
        return petService.findById(id).map(DisplayPetDto::from);
    }

    @Override
    public List<DisplayPetDto> findAll() {
        return DisplayPetDto.from(petService.findAll());
    }

    @Override
    public DisplayPetDto create(CreatePetDto createPetDto,String username) {
        User owner = userService.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return DisplayPetDto.from(petService.create(createPetDto.toPet(owner)));
    }

    @Override
    public Optional<DisplayPetDto> update(Long id, CreatePetDto createPetDto,String username) {
        User owner = userService.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return petService.findById(id)
                .filter(pet -> pet.getOwner().getId().equals(owner.getId()))
                .flatMap(pet -> petService.update(id, createPetDto.toPet(owner)))
                .map(DisplayPetDto::from);
    }

    @Override
    public Optional<DisplayPetDto> deleteById(Long id) {
        return petService.deleteById(id).map(DisplayPetDto::from);
    }

    @Override
    public Page<DisplayPetDto> findMyPets(String username, Pageable pageable) {
        User owner = userService.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return petService
                .findByOwnerId(owner.getId(), pageable)
                .map(DisplayPetDto::from);

    }


}
