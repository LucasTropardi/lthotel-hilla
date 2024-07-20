package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@Table(name = "state", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name", "country_id"})
})
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @NotBlank
    private String name;

	public State() {
		super();
	}

	public State(Long id, Country country, @NotBlank String name) {
		super();
		this.id = id;
		this.country = country;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
