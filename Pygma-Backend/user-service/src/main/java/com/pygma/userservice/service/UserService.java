package com.pygma.userservice.service;

import com.pygma.userservice.entity.Role;
import com.pygma.userservice.entity.User;
import com.pygma.userservice.model.UpdatePasswordRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    User findUserByUsername(String username);
    User findUserByUsernameOrEmail(String username, String email);
    List<User> getUsers();
    User saveUser(User user);
    User updateUser(User user, String username);
    User updateUserPassword(String username, UpdatePasswordRequest updatePasswordRequest);
    User updateUserImage(String username, MultipartFile image);
    List<Role> getRoles();
    Role saveRole(Role role);
    User addRoleToUser(String username, String roleName);
    void deleteUserByUsername(String username);

}
