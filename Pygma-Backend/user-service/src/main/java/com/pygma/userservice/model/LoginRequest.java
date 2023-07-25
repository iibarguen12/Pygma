package com.pygma.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private Boolean isGoogleAuth;
}
