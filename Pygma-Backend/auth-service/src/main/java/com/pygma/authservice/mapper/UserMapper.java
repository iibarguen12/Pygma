package com.pygma.authservice.mapper;

import com.pygma.authservice.entity.User;
import com.pygma.authservice.model.SignupRequest;

public class UserMapper {
    public static User mapSignupRequestToUser(SignupRequest signupRequest) {
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setName(signupRequest.getName());
        user.setLastname(signupRequest.getLastname());
        user.setEmail(signupRequest.getEmail());
        return user;
    }
}
