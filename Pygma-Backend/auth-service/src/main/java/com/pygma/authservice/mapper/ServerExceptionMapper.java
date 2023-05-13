package com.pygma.authservice.mapper;

import com.pygma.authservice.exception.ServiceException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ServerExceptionMapper implements ExceptionMapper<ServiceException> {

    @Override
    public Response toResponse(ServiceException e) {
        return Response.status(e.getStatus().value())
                .entity(e.getMessage())
                .type("application/json").build();
    }
}
