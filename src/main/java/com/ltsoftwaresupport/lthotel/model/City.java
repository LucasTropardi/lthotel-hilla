package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@Table(name = "city", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"name", "state_id"})
	})
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;
    @NotBlank
    private String name;
    
	public City() {
		super();
	}
	
	public City(Long id, State state, @NotBlank String name) {
		super();
		this.id = id;
		this.state = state;
		this.name = name;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public State getState() {
		return state;
	}
	public void setState(State state) {
		this.state = state;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
    
    
}
