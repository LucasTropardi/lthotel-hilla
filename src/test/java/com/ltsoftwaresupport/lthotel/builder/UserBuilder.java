package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.data.Role;
import com.ltsoftwaresupport.lthotel.data.User;

import java.util.HashSet;
import java.util.Set;

public class UserBuilder {
    private User user;

    public static UserBuilder build() {
        UserBuilder userBuilder = new UserBuilder();

        userBuilder.user = new User();
        userBuilder.user.setUsername("manuelson");
        userBuilder.user.setName("Manuelson");
        userBuilder.user.setHashedPassword("123456");
        Set<Role> roles = new HashSet<>();
        roles.add(Role.ADMIN);
        roles.add(Role.USER);
        userBuilder.user.setRoles(roles);
        return userBuilder;
    }

    public UserBuilder addUsername(String username) {
        user.setUsername(username);
        return this;
    }

    public UserBuilder addName(String name) {
        user.setName(name);
        return this;
    }

    public UserBuilder addPassword(String password) {
        user.setHashedPassword(password);
        return this;
    }

    public UserBuilder addRole(HashSet<Role> roles) {
        user.setRoles(roles);
        return this;
    }

    public User now() {
        return user;
    }
}
