package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity(name = "Country")
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "country", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name"})
})
public class Country extends DefaultObject {
    @NotBlank
    private String name;
    @NotBlank
    private String nationality;

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
