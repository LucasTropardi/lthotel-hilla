package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity(name = "State")
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "state")
public class State extends DefaultObject {
    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;
    @NotBlank
    private String name;

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }
}
