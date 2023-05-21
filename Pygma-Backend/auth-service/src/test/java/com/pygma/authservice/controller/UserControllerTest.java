package com.pygma.authservice.controller;

import com.pygma.authservice.entity.User;
import com.pygma.authservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getAllUsersEndpoint() throws Exception {

        User user= new User();
        user.setName("David");
        user.setEmail("david.ibarguen@gmail.com");
        user.setLastname("Ibarguen");
        user.setPhone("6145058934");
        when(userService.getUsers()).thenReturn(List.of(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value("David"))
                .andExpect(jsonPath("$[0].email").value("david.ibarguen@gmail.com"))
                .andExpect(jsonPath("$[0].lastname").value("Ibarguen"))
                .andExpect(jsonPath("$[0].phone").value("6145058934"));

    }
}
