package com.pygma.authservice.config;

import com.pygma.authservice.entity.User;
import com.pygma.authservice.model.LoginResponse;

public interface JwtGenerator {

    LoginResponse generateToken(User user);
}
