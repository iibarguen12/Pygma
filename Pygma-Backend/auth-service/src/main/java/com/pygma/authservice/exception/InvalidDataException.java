package com.pygma.authservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidDataException extends ServiceException {
    public InvalidDataException(String message){super(message, HttpStatus.BAD_REQUEST);}
}
