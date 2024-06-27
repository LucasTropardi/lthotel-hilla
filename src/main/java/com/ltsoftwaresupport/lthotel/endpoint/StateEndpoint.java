package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.model.State;
import com.ltsoftwaresupport.lthotel.repository.StateRepository;
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
public class StateEndpoint {

    StateRepository repository;
    public StateEndpoint(@Autowired StateRepository repository) {
        this.repository = repository;
    }

    public List<State> list() throws DefaultException {
        return repository.findAll();
    }

    public State load(Long id) throws DefaultException {
        return repository.findById(id).orElseThrow(() -> new DefaultException("Não existe"));
    }

    public State save(State state) throws DefaultException {
        return repository.save(state);
    }

    public State update(State state) throws DefaultException {
        return repository.save(state);
    }

    public void delete(Long id) throws DefaultException {
        repository.deleteById(id);
    }

    public void deleteStates(@Nonnull List<@Nonnull Long> ids) throws DefaultException{
        for (Long id : ids) {
            repository.deleteById(id);
        }
    }

    public Page<State> listStates(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<State> listStateByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}
