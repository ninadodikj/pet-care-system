package mk.ukim.finki.wp.petcaresystem.service.application;

import mk.ukim.finki.wp.petcaresystem.model.dto.CreatePetDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayPetDto;
import mk.ukim.finki.wp.petcaresystem.model.projection.PetDetailedProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PetApplicationService {

    Optional<DisplayPetDto> findById(Long id);

    List<DisplayPetDto> findAll();

    DisplayPetDto create(CreatePetDto createPetDto,String username);

    Optional<DisplayPetDto> update(
            Long id,
            CreatePetDto createPetDto,String username
    );

    Optional<DisplayPetDto> deleteById(Long id);

    Page<DisplayPetDto> findMyPets(String username, Pageable pageable);

}