package com.pygma.authservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotFoundException extends ServiceException {
    public NotFoundException(String message){
        super(message, HttpStatus.NOT_FOUND);
    }
}
