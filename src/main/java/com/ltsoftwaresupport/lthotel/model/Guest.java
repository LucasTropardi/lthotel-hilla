package com.ltsoftwaresupport.lthotel.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@Table(name = "guest", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cpf"})
})
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String lastname;
    @ManyToOne
    @JoinColumn(name = "nationality", nullable = false)
    private Country nationality;
    @NotBlank
    private String email;
    @NotBlank
    private String cellPhone;
    private String telephone;
    @NotBlank
    private String address;
    private String cep;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
    @NotBlank
    private String profession;
    @NotBlank
    private String cpf;
    private String rg;
    @NotNull
    private LocalDate birth;
    @NotNull
    private MaritalStatus maritalStatus;
    private Boolean active;
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = true)
    private Company company;
	public Guest() {
		
		super();
	}
	
	public Guest(Long id, @NotBlank String name, @NotBlank String lastname, Country nationality, @NotBlank String email,
			@NotBlank String cellPhone, String telephone, @NotBlank String address, String cep, City city,
			@NotBlank String profession, @NotBlank String cpf, String rg, @NotNull LocalDate birth,
			@NotNull MaritalStatus maritalStatus, Boolean active, Company company) {
		super();
		this.id = id;
		this.name = name;
		this.lastname = lastname;
		this.nationality = nationality;
		this.email = email;
		this.cellPhone = cellPhone;
		this.telephone = telephone;
		this.address = address;
		this.cep = cep;
		this.city = city;
		this.profession = profession;
		this.cpf = cpf;
		this.rg = rg;
		this.birth = birth;
		this.maritalStatus = maritalStatus;
		this.active = active;
		this.company = company;
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
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public Country getNationality() {
		return nationality;
	}
	public void setNationality(Country nationality) {
		this.nationality = nationality;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getRg() {
		return rg;
	}
	public void setRg(String rg) {
		this.rg = rg;
	}
	public LocalDate getBirth() {
		return birth;
	}
	public void setBirth(LocalDate birth) {
		this.birth = birth;
	}
	public MaritalStatus getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(MaritalStatus maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
}
