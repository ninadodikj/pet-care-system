package mk.ukim.finki.wp.petcaresystem.web.controller;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.petcaresystem.model.dto.CreatePetDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.DisplayPetDto;
import mk.ukim.finki.wp.petcaresystem.model.projection.PetDetailedProjection;
import mk.ukim.finki.wp.petcaresystem.service.application.PetApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetApplicationService petApplicationService;


    public PetController(PetApplicationService petApplicationService) {
        this.petApplicationService = petApplicationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayPetDto> findById(@PathVariable Long id) {
        return petApplicationService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DisplayPetDto>> findAll() {
        return ResponseEntity.ok(petApplicationService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayPetDto> create(@RequestBody @Valid CreatePetDto createPetDto,
                                                Authentication authentication) {
        return ResponseEntity.ok(petApplicationService.create(createPetDto,authentication.getName()));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayPetDto> update(
            @PathVariable Long id,
            @RequestBody CreatePetDto createBookDto,
            Authentication authentication
    ) {
        return petApplicationService
                .update(id, createBookDto,authentication.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayPetDto> deleteById(@PathVariable Long id) {
        return petApplicationService
                .deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/my")
    public ResponseEntity<Page<DisplayPetDto>> findMyPets(Authentication authentication, Pageable pageable) {
        return ResponseEntity.ok(petApplicationService.findMyPets(authentication.getName(),pageable));
    }
}
