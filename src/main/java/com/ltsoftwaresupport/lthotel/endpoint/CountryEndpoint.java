package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.repository.CountryRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;

import java.util.List;
import java.util.Optional;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class CountryEndpoint {

    CountryRepository repository;

    public CountryEndpoint(CountryRepository repository) {
        this.repository = repository;
    }

    public List<Country> list() throws DefaultException {
        return repository.findAll();
    }

    public Country load(Long id) throws DefaultException {
        return repository.findById(id).orElseThrow(() -> new DefaultException("Não existe"));
    }

    public Country save(Country country) throws DefaultException {
        return repository.save(country);
    }

    public Country update(Country country) throws DefaultException {
        return repository.save(country);
    }

    public void delete(Long id) throws DefaultException {
        repository.deleteById(id);
    }
}
