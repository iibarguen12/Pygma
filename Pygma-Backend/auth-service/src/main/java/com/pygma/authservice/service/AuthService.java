package com.pygma.authservice.service;

import com.pygma.authservice.model.LoginRequest;
import com.pygma.authservice.model.LoginResponse;
import com.pygma.authservice.model.SignupRequest;
import com.pygma.authservice.model.SimpleResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);

    SimpleResponse signup(SignupRequest signupRequest);
}
