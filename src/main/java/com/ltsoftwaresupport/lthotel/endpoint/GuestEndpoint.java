package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.model.Guest;
import com.ltsoftwaresupport.lthotel.repository.GuestRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class GuestEndpoint {
    GuestRepository repository;
    public GuestEndpoint(@Autowired GuestRepository repository) {
        this.repository = repository;
    }

    public List<Guest> list() throws DefaultException {
        return repository.findAll();
    }

    public Guest load(Long id) throws DefaultException {
        return repository.findById(id).orElseThrow(() -> new DefaultException("Não existe"));
    }

    public Guest save(Guest guest) throws DefaultException {
        return repository.save(guest);
    }

    public Guest update(Guest guest) throws DefaultException {
        return repository.save(guest);
    }

    public void delete(Long id) throws DefaultException {
        repository.deleteById(id);
    }
}
