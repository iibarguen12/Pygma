package com.pygma.userservice.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pygma.userservice.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final String authHeader = request.getHeader("authorization");

        String requestURI = request.getRequestURI();
        if (requestURI.endsWith("/api/v1/auth/login") || requestURI.endsWith("/api/v1/auth/signup")|| requestURI.endsWith("/api/v1/auth/token")) {
            filterChain.doFilter(request, response);
            return;
        }

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {
            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                handleJwtException(response, HttpStatus.UNAUTHORIZED, "Empty Token");
                return;
            }
        }
        try {
            final String token = authHeader.substring(7);
            Algorithm algorithm = Algorithm.HMAC256("secret");
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            request.setAttribute("claims", decodedJWT.getClaims());
            filterChain.doFilter(request, response);
        } catch (TokenExpiredException ex) {
            handleJwtException(response, HttpStatus.UNAUTHORIZED, "Token has expired");
        } catch (JWTDecodeException ex) {
            handleJwtException(response, HttpStatus.UNAUTHORIZED, "Authorization header is invalid");
        } catch (Exception ex) {
            handleJwtException(response, HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while verifying the JWT: " + ex.getLocalizedMessage());
        }
    }

    private void handleJwtException (HttpServletResponse response, HttpStatus status, String message) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(message)
                .status(status.value())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonErrorResponse = objectMapper.writeValueAsString(errorResponse);

        response.setStatus(status.value());
        response.setContentType("application/json");
        response.getWriter().write(jsonErrorResponse);
    }
}
