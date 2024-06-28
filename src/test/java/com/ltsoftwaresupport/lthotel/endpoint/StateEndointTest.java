package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.builder.CountryBuilder;
import com.ltsoftwaresupport.lthotel.builder.StateBuilder;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
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
public class StateEndointTest {

    @Autowired
    StateEndpoint endpoint;
    @Autowired
    CountryEndpoint countryEndpoint;
    private State savedState;
    private Country savedCountry;

    @BeforeEach
    void setup() throws DefaultException {
        Country country = createCountry();
        savedCountry = countryEndpoint.save(country);
        State state = createState();
        state.setCountry(savedCountry);
        savedState = endpoint.save(state);
    }

    @AfterEach
    void cleanup() throws DefaultException {
        if (savedState != null)
            endpoint.delete(savedState.getId());
        if (savedCountry != null)
            countryEndpoint.delete(savedCountry.getId());
    }

    private State createState() throws DefaultException {
        return StateBuilder.build().now();
    }

    private Country createCountry() throws DefaultException {
        return CountryBuilder.build().now();
    }

    @Test
    @Order(1)
    void save() throws DefaultException {
        assertNotNull(savedState);
    }

    @Test
    @Order(2)
    void update() throws DefaultException {
        assertNotNull(savedState);
        savedState.setName("updated");
        State updatedState = endpoint.update(savedState);
        assertEquals("updated", updatedState.getName());
    }

    @Test
    @Order(3)
    void list() throws DefaultException {
        assertNotNull(endpoint.list());
    }

    @Test
    @Order(4)
    void load() throws DefaultException {
        assertNotNull(savedState);
        assertNotNull(endpoint.load(savedState.getId()));
    }

    @Test
    @Order(5)
    void delete() throws DefaultException {
        assertNotNull(savedState);
        endpoint.delete(savedState.getId());
        assertThrows(DefaultException.class, () -> endpoint.load(savedState.getId()));
    }
}
