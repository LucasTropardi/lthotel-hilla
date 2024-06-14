package com.ltsoftwaresupport.lthotel.services;

import com.ltsoftwaresupport.lthotel.data.User;
import com.ltsoftwaresupport.lthotel.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.Optional;

import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }

    @Autowired
    public UserEndpoint(UserService userService) {
        this.userService = userService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public @Nonnull Optional<User> getUser(@Nonnull Long id) {
        return userService.get(id);
    }

    public @Nonnull User createUser(@Nonnull User user) {
        if (user.getHashedPassword() != null && !user.getHashedPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(user.getHashedPassword());
            user.setHashedPassword(encodedPassword);
        }

        if (user.getProfilePicture() == null) {
            user.setProfilePicture(new byte[]{1, 2, 1, 2});
        }

        return userService.save(user);
    }

    public @Nonnull User updateUser(@Nonnull Long id, @Nonnull User user) {
        user.setId(id);
        return userService.update(user);
    }

    public void deleteUser(@Nonnull Long id) {
        userService.delete(id);
    }

    public void deleteUsers(@Nonnull List<@Nonnull Long> ids) {
        for (Long id : ids) {
            deleteUser(id);
        }
    }

    public @Nonnull List<User> listUsers(Pageable pageable) {
        return userService.list(pageable).getContent();
    }

    public @Nonnull List<User> listAllUsers() { return userService.listAll(); }

}
