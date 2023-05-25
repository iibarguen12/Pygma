package com.pygma.authservice.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pygma.authservice.entity.User;
import com.pygma.authservice.exception.InvalidDataException;
import com.pygma.authservice.model.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Date;

@Service
public class JwtGeneratorServiceImpl implements JwtGeneratorService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.refreshSecret}")
    private String refreshSecret;

    @Autowired
    private UserService userService;

    @Override
    public LoginResponse generateToken(User user) {

        final Date issuedAt = new Date();
        final long TOKEN_EXPIRATION = 30;
        final Date expiration = Date.from(ZonedDateTime.now().plusMinutes(TOKEN_EXPIRATION).toInstant());
        final Date refreshExpiration = Date.from(ZonedDateTime.now().plusDays(TOKEN_EXPIRATION).toInstant());


        final String token = JWT.create()
                .withSubject(user.getUsername())
                .withClaim("username", user.getUsername())
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC256(jwtSecret));

        final String refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withClaim("username", user.getUsername())
                .withIssuedAt(issuedAt)
                .withExpiresAt(refreshExpiration)
                .sign(Algorithm.HMAC256(refreshSecret));

        return LoginResponse
                .builder()
                .message("Login Successful")
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public LoginResponse refreshToken(String refreshToken) {
        try {
            DecodedJWT decodedRefreshToken = JWT.require(Algorithm.HMAC256(refreshSecret))
                    .build()
                    .verify(refreshToken);

            String username = decodedRefreshToken.getClaim("username").asString();
            User user = userService.findUserByUsername(username);

            return generateToken(user);
        } catch (Exception e) {
            throw new InvalidDataException("Failed to refresh token");
        }
    }
}
