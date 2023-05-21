package com.pygma.authservice.service;

import com.pygma.authservice.entity.Role;
import com.pygma.authservice.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User findUserByUsername(String username);
    User findUserByUsernameOrEmail(String username, String email);
    List<User> getUsers();
    User saveUser(User user);
    List<Role> getRoles();
    Role saveRole(Role role);
    User addRoleToUser(String username, String roleName);
    void deleteUserById(UUID id);

}
