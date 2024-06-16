package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.builder.CountryBuilder;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.model.Country;
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
public class CountryEndpointTest {

    @Autowired
    CountryEndpoint endpoint;
    private Country savedCountry;

    @BeforeEach
    void setup() throws DefaultException {
        Country country =  createCountry();
        savedCountry = endpoint.save(country);
    }

    @AfterEach
    void cleanup() throws DefaultException {
        if (savedCountry != null)
            endpoint.delete(savedCountry);
    }

    private Country createCountry() throws DefaultException {
        return CountryBuilder.build().now();
    }

    @Test
    @Order(1)
    void save() throws DefaultException {
        assertNotNull(savedCountry);
    }

    @Test
    @Order(2)
    void update() throws DefaultException {
        assertNotNull(savedCountry);
        savedCountry.setNationality("updated");
        Country updatedCountry = endpoint.update(savedCountry);
        assertEquals("updated", updatedCountry.getNationality());
    }

    @Test
    @Order(3)
    void list() throws DefaultException {
        assertNotNull(endpoint.list());
    }

    @Test
    @Order(4)
    void load() throws DefaultException {
        assertNotNull(savedCountry);
        assertNotNull(endpoint.load(savedCountry.getId()));
    }

    @Test
    @Order(5)
    void delete() throws DefaultException {
        assertNotNull(savedCountry);
        endpoint.delete(savedCountry);
        assertThrows(DefaultException.class, () -> endpoint.load(savedCountry.getId()));
    }
}
