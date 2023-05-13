package com.pygma.applicationsservice.resource;

import com.pygma.applicationsservice.entity.Application;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ApplicationsResourceTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @Order(1)
    void getAllApplications() throws Exception {
        // given - the pre inserted 30 applications with the import.sql file

        // when -  getting all the applications
        ResultActions response = mockMvc.perform(
                get("/api/v1/applications")
        );

        // then - should return ok status and the 30 records
        response.andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()",Matchers.is(30)));
    }

    @Test
    @Order(2)
    void getApplicationById() throws Exception {
        // given - the pre inserted 30 applications with the import.sql file

        // when -  getting the application id 20
        ResultActions response = mockMvc.perform(
                get("/api/v1/applications/20")
        );

        // then - should return ok status and the application id 20
        response.andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is("Application 20")));
    }

    @Test
    @Order(3)
    void createApplication() throws Exception {
        // given - a new application object
        Application newApplication = Application.builder().id(null).name("New Application").build();

        // when - action or behaviour that we are going test
        ResultActions response = mockMvc.perform(
                post("/api/v1/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newApplication))
        );

        // then - should return ok status and the data of the new application
        response.andDo(print())
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(newApplication.getName())));
    }

    @Test
    @Order(4)
    void updateApplication() throws Exception {
        // given - the pre inserted 30 applications with the import.sql file and a new application object
        Application newApplication = Application.builder().id(null).name("New Application").build();

        // when -  deleting the application id 20
        ResultActions response = mockMvc.perform(
                put("/api/v1/applications/20")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newApplication))
        );

        // then - should return  Ok status and the modified object
        response.andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(20)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(newApplication.getName())));
    }

    @Test
    @Order(5)
    void deleteApplication() throws Exception {
        // given - the pre inserted 30 applications with the import.sql file

        // when -  deleting the application id 20
        ResultActions response = mockMvc.perform(
                delete("/api/v1/applications/20")
        );

        // then - should return deleted (no content) status
        response.andDo(print())
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}