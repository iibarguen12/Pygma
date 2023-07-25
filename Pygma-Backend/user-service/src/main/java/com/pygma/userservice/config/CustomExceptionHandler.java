package com.pygma.userservice.config;

import com.pygma.userservice.exception.ServiceException;
import com.pygma.userservice.model.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Object> handleCustomException(ServiceException ex, WebRequest request){
        ErrorResponse response = ErrorResponse.builder()
                .message(ex.getMessage())
                .status(ex.getStatus().value())
                .build();
        return handleExceptionInternal(ex,response ,new HttpHeaders(), ex.getStatus(), request);
    }
}
