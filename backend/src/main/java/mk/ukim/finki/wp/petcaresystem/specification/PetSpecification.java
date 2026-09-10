package mk.ukim.finki.wp.petcaresystem.specification;

import mk.ukim.finki.wp.petcaresystem.model.domain.Pet;
import mk.ukim.finki.wp.petcaresystem.model.dto.PetFilter;
import org.springframework.data.jpa.domain.Specification;

public class PetSpecification {

    public static Specification<Pet> buildFrom(PetFilter filter) {

        Specification<Pet> spec =
                (root, query, cb) -> cb.conjunction();

        if (filter == null) {
            return spec;
        }

        if (filter.species() != null && !filter.species().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("species"), filter.species()));
        }

        if (filter.breed() != null && !filter.breed().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("breed"), filter.breed()));
        }

        if (filter.gender() != null && !filter.gender().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("gender"), filter.gender()));
        }

        if (filter.ownerId() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("owner").get("id"), filter.ownerId()));
        }

        return spec;
    }
}