package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.repository.CountryRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class CountryEndpoint extends DefaultEndpoint<Country, Long, CountryRepository> {

    public CountryEndpoint(CountryRepository repository) {
        super(repository);
    }

    @Override
    protected void validate(Country entity, DefaultEndpoint.Mode mode) throws DefaultException {
        super.validate(entity, mode);

        switch (mode) {
            case SAVE:
                System.out.println("save");
                if (repository.existsById(entity.getId())) throw new DefaultException("País já cadastrado.");
                break;

            case UPDATE:
                System.out.println("update");
                if (!repository.existsById(entity.getId())) throw new DefaultException("País não cadastrado.");
                break;

            case DELETE:
                System.out.println("delete");
//                if (!repository.existsById(entity.getId())) throw new DefaultException("País não cadastrado.");
                break;
        }
    }
}
