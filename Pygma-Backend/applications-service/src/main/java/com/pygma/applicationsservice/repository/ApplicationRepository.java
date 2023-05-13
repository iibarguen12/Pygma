package com.pygma.applicationsservice.repository;

import com.pygma.applicationsservice.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByNameContaining(String name);
}
