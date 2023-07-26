package com.pygma.userservice.repository;

import com.pygma.userservice.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationRepository extends JpaRepository <Application, Long> {
    Optional<Application> findApplicationByUsernameIgnoreCase(String username);
}
