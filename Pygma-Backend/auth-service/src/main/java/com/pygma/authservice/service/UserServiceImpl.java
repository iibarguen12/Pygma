package com.pygma.authservice.service;

import com.pygma.authservice.entity.User;
import com.pygma.authservice.entity.Role;
import com.pygma.authservice.exception.InvalidDataException;
import com.pygma.authservice.exception.NotFoundException;
import com.pygma.authservice.model.UpdatePasswordRequest;
import com.pygma.authservice.repository.RoleRepository;
import com.pygma.authservice.repository.UserRepository;
import com.pygma.authservice.util.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findUserByUsername(String username) {
        return userRepo.findUserByUsernameIgnoreCase(username).orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Override
    public User findUserByUsernameOrEmail(String username, String email) {
        Optional<User> userByUsername = userRepo.findUserByUsernameIgnoreCase(username);
        if (userByUsername.isPresent()) {
            return userByUsername.get();
        } else {
            Optional<User> userByEmail = userRepo.findUserByEmailIgnoreCase(email);
            if (userByEmail.isPresent()) {
                return userByEmail.get();
            } else {
                throw new NotFoundException("User not found");
            }
        }
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }
    @Transactional
    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to the database", user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User updateUser(User updatedUser, String username) {
        User currentUser = findUserByUsername(updatedUser.getUsername());
        if (!username.equals(currentUser.getUsername())){
            throw new InvalidDataException("Username doesn't match with the request");
        }
        currentUser.setName(updatedUser.getName());
        currentUser.setLastname(updatedUser.getLastname());
        currentUser.setEmail(updatedUser.getEmail());
        currentUser.setPhone(updatedUser.getPhone());
        return userRepo.save(currentUser);
    }

    @Override
    public User updateUserPassword(String username, UpdatePasswordRequest updatePasswordRequest) {
        User user = findUserByUsername(username);
        if (!passwordEncoder.matches(updatePasswordRequest.getCurrentPassword(), user.getPassword())){
            throw new NotFoundException("Incorrect user password");
        }
        if (passwordEncoder.matches(updatePasswordRequest.getNewPassword(), user.getPassword())){
            throw new NotFoundException("New password cannot be the same as your old password");
        }
        if(!UserUtils.isValidPassword(updatePasswordRequest.getNewPassword())){
            throw new InvalidDataException("Invalid password format. " +
                    "The password must be at least 8 characters long and contain at least one uppercase letter, " +
                    "one lowercase letter, one number, and one special character.");
        }
        user.setPassword(updatePasswordRequest.getNewPassword());
        return saveUser(user);
    }

    @Override
    public List<Role> getRoles() {
        return roleRepo.findAll();
    }

    @Transactional
    @Override
    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }

    @Transactional
    @Override
    public User addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepo.findUserByUsernameIgnoreCase(username).orElseThrow(() -> new NotFoundException("User not found"));
        Role role = roleRepo.findByName(roleName).orElseThrow(() -> new NotFoundException("Role not found"));
        if (user.getRoles() == null) {
            user.setRoles(Collections.singleton(role));
        } else {
            user.getRoles().add(role);
        }
        return user;
    }

    @Override
    public void deleteUserByUsername(String username) {
        User currentUser = findUserByUsername(username);
        userRepo.deleteById(currentUser.getId());
    }

}
