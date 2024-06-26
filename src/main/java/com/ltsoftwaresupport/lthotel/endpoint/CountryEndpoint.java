package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.data.User;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.repository.CountryRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    public void deleteCountries(@Nonnull List<@Nonnull Long> ids) throws DefaultException{
        for (Long id : ids) {
            repository.deleteById(id);
        }
    }

    public Page<Country> listCountries(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Country> listCountryByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }


}
