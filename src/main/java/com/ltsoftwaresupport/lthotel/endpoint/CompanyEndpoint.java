package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.repository.CompanyRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Endpoint
@RolesAllowed({"ADMIN", "USER"})
public class CompanyEndpoint extends DefaultEndpoint<Company, Long, CompanyRepository> {
    public CompanyEndpoint(CompanyRepository repository) {
        super(repository);
    }

    @Override
    protected void validate(Company entity, DefaultEndpoint.Mode mode) throws DefaultException {
        super.validate(entity, mode);

        switch (mode) {
            case SAVE:
                System.out.println("save");
                if (repository.existsById(entity.getId())) throw new DefaultException("Empresa já cadastrada.");
                break;

            case UPDATE:
                System.out.println("update");
                if (!repository.existsById(entity.getId())) throw new DefaultException("Empresa não cadastrada.");
                break;

            case DELETE:
                System.out.println("delete");
//                if (!repository.existsById(entity.getId())) throw new DefaultException("Empresa não cadastrada.");
                break;
        }
    }
}