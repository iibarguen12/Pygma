package com.pygma.authservice.service;

import com.pygma.authservice.model.LoginRequest;
import com.pygma.authservice.model.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
