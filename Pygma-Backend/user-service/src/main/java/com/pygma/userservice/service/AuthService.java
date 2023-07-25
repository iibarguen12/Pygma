package com.pygma.userservice.service;

import com.pygma.userservice.model.*;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);

    SimpleResponse signup(SignupRequest signupRequest);

    LoginResponse refreshToken(RefreshTokenRequest token);
}
