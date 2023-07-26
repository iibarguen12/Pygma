package com.pygma.userservice.service;

import com.pygma.userservice.entity.Application;

import java.util.List;

public interface ApplicationService {
    Application findApplicationByUsername(String username);
    List<Application> getApplications();
    Application saveApplication(Application application);
    Application updateApplication(Application application, String username);
    void deleteApplicationByUsername(String username);

}
