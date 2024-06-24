package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "guest", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cnpj"})
})
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @NotBlank
    private String maritalStatus;
    private Boolean active;
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = true)
    private Company company;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }

    public @NotBlank String getLastname() {
        return lastname;
    }

    public void setLastname(@NotBlank String lastname) {
        this.lastname = lastname;
    }

    public Country getNationality() {
        return nationality;
    }

    public void setNationality(Country nationality) {
        this.nationality = nationality;
    }

    public @NotBlank String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank String email) {
        this.email = email;
    }

    public @NotBlank String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(@NotBlank String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public @NotBlank String getAddress() {
        return address;
    }

    public void setAddress(@NotBlank String address) {
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

    public @NotBlank String getProfession() {
        return profession;
    }

    public void setProfession(@NotBlank String profession) {
        this.profession = profession;
    }

    public @NotBlank String getCpf() {
        return cpf;
    }

    public void setCpf(@NotBlank String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public @NotNull LocalDate getBirth() {
        return birth;
    }

    public void setBirth(@NotNull LocalDate birth) {
        this.birth = birth;
    }

    public @NotBlank String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(@NotBlank String maritalStatus) {
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
