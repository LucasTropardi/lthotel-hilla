package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.builder.*;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.*;
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
public class GuestEndpointTest {
    @Autowired
    GuestEndpoint endpoint;
    @Autowired
    CityEndpoint cityEndpoint;
    @Autowired
    StateEndpoint stateEndpoint;
    @Autowired
    CountryEndpoint countryEndpoint;
    private Guest savedGuest;
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
        Guest guest = createGuest();
        guest.setNationality(savedCountry);
        guest.setCity(savedCity);
        savedGuest = endpoint.save(guest);
    }

    @AfterEach
    void cleanup() throws DefaultException {
        if (savedGuest != null)
            endpoint.delete(savedGuest);
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

    private Guest createGuest() {
        return GuestBuilder.build().now();
    }

    @Test
    @Order(1)
    void save() throws DefaultException {
        assertNotNull(savedGuest);
    }

    @Test
    @Order(2)
    void update() throws DefaultException {
        assertNotNull(savedGuest);
        savedGuest.setName("updated");
        Guest updatedGuest = endpoint.update(savedGuest);
        assertEquals("updated", updatedGuest.getName());
    }

    @Test
    @Order(3)
    void list() throws DefaultException {
        assertNotNull(endpoint.list());
    }

    @Test
    @Order(4)
    void load() throws DefaultException {
        assertNotNull(savedGuest);
        assertNotNull(endpoint.load(savedGuest.getId()));
    }

    @Test
    @Order(5)
    void delete() throws DefaultException {
        assertNotNull(savedGuest);
        endpoint.delete(savedGuest);
        assertThrows(DefaultException.class, () -> endpoint.load(savedGuest.getId()));
    }
}
