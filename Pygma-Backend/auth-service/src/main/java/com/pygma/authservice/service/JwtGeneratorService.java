package com.pygma.authservice.service;

import com.pygma.authservice.entity.User;
import com.pygma.authservice.model.LoginResponse;

public interface JwtGeneratorService {

    LoginResponse generateToken(User user);
}
