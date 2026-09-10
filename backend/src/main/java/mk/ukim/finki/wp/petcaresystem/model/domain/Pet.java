package mk.ukim.finki.wp.petcaresystem.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "pets")
@NamedEntityGraph(
        name = "pet-entity-graph",
        attributeNodes = {
                @NamedAttributeNode("owner")
        }
)
public class Pet extends BaseAuditableEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String species;

    private String breed;

    private String gender;

    private LocalDate birthDate;

    private Double weight;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public Pet(String name, String species, String breed, String gender,
               LocalDate birthDate, Double weight, User owner) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.gender = gender;
        this.birthDate = birthDate;
        this.weight = weight;
        this.owner = owner;
    }
}