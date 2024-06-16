package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.State;
import com.ltsoftwaresupport.lthotel.repository.StateRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class StateEndpoint extends DefaultEndpoint<State, Long, StateRepository> {
    public StateEndpoint(StateRepository repository) {
        super(repository);
    }

    @Override
    protected void validate(State entity, DefaultEndpoint.Mode mode) throws DefaultException {
        super.validate(entity, mode);

        switch (mode) {
            case SAVE:
                System.out.println("save");
                if (repository.existsById(entity.getId())) throw new DefaultException("Estado já cadastrado.");
                break;

            case UPDATE:
                System.out.println("update");
                if (!repository.existsById(entity.getId())) throw new DefaultException("Estado não cadastrado.");
                break;

            case DELETE:
                System.out.println("delete");
//                if (!repository.existsById(entity.getId())) throw new DefaultException("Estado não cadastrado.");
                break;
        }
    }
}
