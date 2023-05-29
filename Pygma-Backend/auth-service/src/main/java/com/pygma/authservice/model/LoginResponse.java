package com.pygma.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    @NonNull
    private String message;
    @NonNull
    private String token;
    @NonNull
    private String refreshToken;
}
