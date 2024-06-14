package com.ltsoftwaresupport.lthotel.endpoint;

import com.ltsoftwaresupport.lthotel.builder.UserBuilder;
import com.ltsoftwaresupport.lthotel.data.User;
import com.ltsoftwaresupport.lthotel.exception.DefaultException;
import com.ltsoftwaresupport.lthotel.services.UserEndpoint;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Lucas Tropardi
 */
@SpringBootTest
public class UserEndpointTest {

    @Autowired
    UserEndpoint endPoint;

    private User savedUser;

    @BeforeEach
    void setup() throws DefaultException, DefaultException {
        User user = createUser();
        savedUser = endPoint.createUser(user);
    }

    @AfterEach
    void cleanup() throws DefaultException {
        if (savedUser != null) {
            endPoint.deleteUser(savedUser.getId());
        }
    }

    private User createUser() throws DefaultException {
        return UserBuilder.build().now();
    }

    @Test
    void save() throws DefaultException {
        assertNotNull(savedUser);
    }
}
