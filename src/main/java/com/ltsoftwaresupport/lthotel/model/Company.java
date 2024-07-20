package com.ltsoftwaresupport.lthotel.model;

import com.ltsoftwaresupport.lthotel.validation.ValidCNPJ;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@Table(name = "company", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cnpj"})
})
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String razaoSocial;
    @NotBlank
    private String inscricaoEstadual;
    @NotBlank
    private String fantasia;
    @ValidCNPJ
    @NotBlank
    private String cnpj;
    @NotBlank
    private String address;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
    @NotBlank
    private String email;
    @NotBlank
    private String telefone;
    
	public Company() {
		super();
	}
	
	public Company(Long id, @NotBlank String razaoSocial, @NotBlank String inscricaoEstadual, @NotBlank String fantasia,
			@NotBlank String cnpj, @NotBlank String address, City city, @NotBlank String email,
			@NotBlank String telefone) {
		super();
		this.id = id;
		this.razaoSocial = razaoSocial;
		this.inscricaoEstadual = inscricaoEstadual;
		this.fantasia = fantasia;
		this.cnpj = cnpj;
		this.address = address;
		this.city = city;
		this.email = email;
		this.telefone = telefone;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRazaoSocial() {
		return razaoSocial;
	}
	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}
	public String getInscricaoEstadual() {
		return inscricaoEstadual;
	}
	public void setInscricaoEstadual(String inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}
	public String getFantasia() {
		return fantasia;
	}
	public void setFantasia(String fantasia) {
		this.fantasia = fantasia;
	}
	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
    
    
}
