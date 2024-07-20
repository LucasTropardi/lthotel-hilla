package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
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
    
	public Country() {
		super();
	}
	
	public Country(Long id, @NotBlank String name, @NotBlank String nationality) {
		super();
		this.id = id;
		this.name = name;
		this.nationality = nationality;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
    
    
}
