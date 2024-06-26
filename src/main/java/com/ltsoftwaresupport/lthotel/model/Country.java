package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "country", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name"})
})
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String nationality;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank String getNationality() {
        return nationality;
    }

    public void setNationality(@NotBlank String nationality) {
        this.nationality = nationality;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }
}
