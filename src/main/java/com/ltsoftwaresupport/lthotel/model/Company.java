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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(@NotBlank String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public @NotBlank String getInscricaoEstadual() {
        return inscricaoEstadual;
    }

    public void setInscricaoEstadual(@NotBlank String inscricaoEstadual) {
        this.inscricaoEstadual = inscricaoEstadual;
    }

    public @NotBlank String getFantasia() {
        return fantasia;
    }

    public void setFantasia(@NotBlank String fantasia) {
        this.fantasia = fantasia;
    }

    public @NotBlank String getCnpj() {
        return cnpj;
    }

    public void setCnpj(@NotBlank String cnpj) {
        this.cnpj = cnpj;
    }

    public @NotBlank String getAddress() {
        return address;
    }

    public void setAddress(@NotBlank String address) {
        this.address = address;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public @NotBlank String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank String email) {
        this.email = email;
    }

    public @NotBlank String getTelefone() {
        return telefone;
    }

    public void setTelefone(@NotBlank String telefone) {
        this.telefone = telefone;
    }
}
