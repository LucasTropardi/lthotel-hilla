package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.repository.CompanyRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class CompanyEndpoint {
    CompanyRepository repository;
    public CompanyEndpoint(@Autowired CompanyRepository repository) {
        this.repository = repository;
    }

    public List<Company> list() throws DefaultException {
        return repository.findAll();
    }

    public Company load(Long id) throws DefaultException {
        return repository.findById(id).orElseThrow(() -> new DefaultException("Não existe"));
    }

    public Company save(Company company) throws DefaultException {
        return repository.save(company);
    }

    public Company update(Company company) throws DefaultException {
        return repository.save(company);
    }

    public void delete(Long id) throws DefaultException {
       repository.deleteById(id);
    }

    public void deleteCompanies(@Nonnull List<@Nonnull Long> ids) throws DefaultException{
        for (Long id : ids) {
            repository.deleteById(id);
        }
    }

    public Page<Company> listCompanies(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Company> listCompanyByName(String razaoSocial) {
        return repository.findByRazaoSocialContainingIgnoreCase(razaoSocial);
    }
}
