package com.pygma.userservice.service;

import com.pygma.userservice.entity.User;
import com.pygma.userservice.model.LoginResponse;

public interface JwtGeneratorService {

    LoginResponse generateToken(User user);
    LoginResponse refreshToken(String refreshToken);
}
