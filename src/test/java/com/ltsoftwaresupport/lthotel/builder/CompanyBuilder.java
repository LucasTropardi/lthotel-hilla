package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.Company;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
public class CompanyBuilder {
    private Company company;

    public static CompanyBuilder build() {
        CompanyBuilder companyBuilder = new CompanyBuilder();
        companyBuilder.company = new Company();
        companyBuilder.company.setId(0L);
        companyBuilder.company.setRazaoSocial("Razao Social");
        companyBuilder.company.setInscricaoEstadual("037.889.368.209");
        companyBuilder.company.setFantasia("Fantasia");
        companyBuilder.company.setCnpj("79.617.654/0001-19");
        companyBuilder.company.setAddress("Full address");
        companyBuilder.company.setCity(new City());
        companyBuilder.company.setEmail("email@gmail.com");
        companyBuilder.company.setTelefone("(18) 98988-8899");
        return companyBuilder;
    }

    public CompanyBuilder addId(Long id) {
        company.setId(id);
        return this;
    }

    public CompanyBuilder addRazaoSocial(String razaoSocial) {
        company.setRazaoSocial(razaoSocial);
        return this;
    }

    public CompanyBuilder addInscricaoEstadual(String inscricaoEstadual) {
        company.setInscricaoEstadual(inscricaoEstadual);
        return this;
    }

    public CompanyBuilder addFantasia(String fantasia) {
        company.setFantasia(fantasia);
        return this;
    }

    public CompanyBuilder addCnpj(String cnpj) {
        company.setCnpj(cnpj);
        return this;
    }

    public CompanyBuilder addAddress(String address) {
        company.setAddress(address);
        return this;
    }

    public CompanyBuilder addCity(City city) {
        company.setCity(city);
        return this;
    }

    public CompanyBuilder addEmail(String email) {
        company.setEmail(email);
        return this;
    }

    public CompanyBuilder addTelefone(String telefone) {
        company.setTelefone(telefone);
        return this;
    }

    public Company now() {
        return company;
    }
}
