package com.ltsoftwaresupport.lthotel.model;

import com.ltsoftwaresupport.lthotel.validation.ValidCNPJ;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
}
