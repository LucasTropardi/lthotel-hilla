package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.repository.CityRepository;
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
public class CityEndpoint {
    CityRepository repository;
    public CityEndpoint(@Autowired CityRepository repository) {
        this.repository = repository;
    }

    public List<City> list() throws DefaultException {
        return repository.findAll();
    }

    public City load(Long id) throws DefaultException {
        return repository.findById(id).orElseThrow(() -> new DefaultException("Não existe"));
    }

    public City save(City city) throws DefaultException {
        return repository.save(city);
    }

    public City update(City city) throws DefaultException {
        return repository.save(city);
    }

    public void delete(Long id) throws DefaultException {
        repository.deleteById(id);
    }
    
    public void deleteCities(@Nonnull List<@Nonnull Long> ids) throws DefaultException{
        for (Long id : ids) {
            repository.deleteById(id);
        }
    }

    public Page<City> listCities(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<City> listCityByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}
