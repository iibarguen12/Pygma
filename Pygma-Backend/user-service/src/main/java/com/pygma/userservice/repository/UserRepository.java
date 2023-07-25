package com.pygma.userservice.repository;

import com.pygma.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository <User, UUID> {
    Optional<User> findUserByUsernameIgnoreCase(String username);
    Optional<User> findUserByEmailIgnoreCase(String email);
}
