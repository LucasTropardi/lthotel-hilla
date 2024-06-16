package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.model.Guest;
import com.ltsoftwaresupport.lthotel.repository.GuestRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class GuestEndpoint extends DefaultEndpoint<Guest, Long, GuestRepository> {
    public GuestEndpoint(GuestRepository repository) {
        super(repository);
    }

    @Override
    protected void validate(Guest entity, DefaultEndpoint.Mode mode) throws DefaultException {
        super.validate(entity, mode);

        switch (mode) {
            case SAVE:
                System.out.println("save");
                if (repository.existsById(entity.getId())) throw new DefaultException("Hóspede já cadastrado.");
                break;

            case UPDATE:
                System.out.println("update");
                if (!repository.existsById(entity.getId())) throw new DefaultException("Hóspede não cadastrado.");
                break;

            case DELETE:
                System.out.println("delete");
//                if (!repository.existsById(entity.getId())) throw new DefaultException("Hospede não cadastrado.");
                break;
        }
    }
}
