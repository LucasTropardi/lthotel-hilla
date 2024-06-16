package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.builder.CityBuilder;
import com.ltsoftwaresupport.lthotel.builder.CompanyBuilder;
import com.ltsoftwaresupport.lthotel.builder.CountryBuilder;
import com.ltsoftwaresupport.lthotel.builder.StateBuilder;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.model.State;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CompanyEndpointTest {
    @Autowired
    CompanyEndpoint endpoint;
    @Autowired
    CityEndpoint cityEndpoint;
    @Autowired
    StateEndpoint stateEndpoint;
    @Autowired
    CountryEndpoint countryEndpoint;
    private Company savedCompany;
    private City savedCity;
    private State savedState;
    private Country savedCountry;

    @BeforeEach
    void setup() throws DefaultException {
        Country country = createCountry();
        savedCountry = countryEndpoint.save(country);
        State state = createState();
        state.setCountry(savedCountry);
        savedState = stateEndpoint.save(state);
        City city = createCity();
        city.setState(savedState);
        savedCity = cityEndpoint.save(city);
        Company company = createCompany();
        company.setCity(savedCity);
        savedCompany = endpoint.save(company);
    }

    @AfterEach
    void cleanup() throws DefaultException {
        if (savedCompany != null)
            endpoint.delete(savedCompany);
        if (savedCity != null)
            cityEndpoint.delete(savedCity);
        if (savedState != null)
            stateEndpoint.delete(savedState);
        if (savedCountry != null)
            countryEndpoint.delete(savedCountry);
    }

    private State createState() throws DefaultException {
        return StateBuilder.build().now();
    }

    private Country createCountry() throws DefaultException {
        return CountryBuilder.build().now();
    }

    private City createCity() throws DefaultException {
        return CityBuilder.build().now();
    }

    private Company createCompany() throws DefaultException {
        return CompanyBuilder.build().now();
    }

    @Test
    @Order(1)
    void save() throws DefaultException {
        assertNotNull(savedCompany);
    }

    @Test
    @Order(2)
    void update() throws DefaultException {
        assertNotNull(savedCompany);
        savedCompany.setRazaoSocial("updated");
        Company updatedCompany = endpoint.update(savedCompany);
        assertEquals("updated", updatedCompany.getRazaoSocial());
    }

    @Test
    @Order(3)
    void list() throws DefaultException {
        assertNotNull(endpoint.list());
    }

    @Test
    @Order(4)
    void load() throws DefaultException {
        assertNotNull(savedCompany);
        assertNotNull(endpoint.load(savedCompany.getId()));
    }

    @Test
    @Order(5)
    void delete() throws DefaultException {
        assertNotNull(savedCompany);
        endpoint.delete(savedCompany);
        assertThrows(DefaultException.class, () -> endpoint.load(savedCompany.getId()));
    }
}
