package com.pygma.authservice.service;

import com.pygma.authservice.model.*;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);

    SimpleResponse signup(SignupRequest signupRequest);

    LoginResponse refreshToken(RefreshTokenRequest token);
}
