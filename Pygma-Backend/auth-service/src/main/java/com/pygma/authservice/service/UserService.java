package com.pygma.authservice.service;

import com.pygma.authservice.entity.Role;
import com.pygma.authservice.entity.User;

import java.util.List;

public interface UserService {
    User findUserByUsername(String username);
    User findUserByUsernameOrEmail(String username, String email);
    List<User> getUsers();
    User saveUser(User user);
    User updateUser(User user, String username);
    List<Role> getRoles();
    Role saveRole(Role role);
    User addRoleToUser(String username, String roleName);
    void deleteUserByUsername(String username);

}
