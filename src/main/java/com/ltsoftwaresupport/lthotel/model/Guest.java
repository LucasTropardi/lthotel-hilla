package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    @NotBlank
    private String maritalStatus;
    private Boolean active;
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = true)
    private Company company;
}
