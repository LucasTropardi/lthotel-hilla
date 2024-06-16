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
@Entity(name = "City")
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "city")
public class City extends DefaultObject {
    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;
    @NotBlank
    private String name;

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }
}
