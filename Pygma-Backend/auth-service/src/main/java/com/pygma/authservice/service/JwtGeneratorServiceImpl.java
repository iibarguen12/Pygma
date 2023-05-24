package com.pygma.authservice.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pygma.authservice.entity.User;
import com.pygma.authservice.model.LoginResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Date;

@Service
public class JwtGeneratorServiceImpl implements JwtGeneratorService {

    @Value("${jwt.secret}")
    private String secret;

    @Override
    public LoginResponse generateToken(User user) {

        final Date issuedAt = new Date();
        final long TOKEN_EXPIRATION_IN_MINUTES = 15;
        final Date expiration = Date.from(ZonedDateTime.now().plusMinutes(TOKEN_EXPIRATION_IN_MINUTES).toInstant());

        final String token = JWT.create()
                .withSubject(user.getUsername())
                .withClaim("username", user.getUsername())
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC256(secret));

        return LoginResponse
                .builder()
                .message("Login Successful")
                .token(token)
                .build();
    }
}
