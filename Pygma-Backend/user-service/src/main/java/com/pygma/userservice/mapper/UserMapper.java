package com.pygma.userservice.mapper;

import com.pygma.userservice.entity.User;
import com.pygma.userservice.model.SignupRequest;

public class UserMapper {
    public static User mapSignupRequestToUser(SignupRequest signupRequest) {
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setName(signupRequest.getName());
        user.setLastname(signupRequest.getLastname());
        user.setEmail(signupRequest.getEmail());
        user.setIsGoogleAuth(signupRequest.getIsGoogleAuth());
        user.setImageURL(signupRequest.getImageURL());
        return user;
    }
}
