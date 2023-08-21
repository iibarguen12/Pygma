package com.pygma.userservice.resource;

import com.pygma.userservice.entity.User;
import com.pygma.userservice.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private final User mockUser = new User();

    @BeforeAll
    public void setUp(){
        mockUser.setUsername("pygma");
        mockUser.setName("Pygma");
        mockUser.setEmail("demo@pygma.com");
        mockUser.setLastname("Admin");
        mockUser.setPhone("123456789");
    }

    @Test
    @Disabled("Temporarily skipping due to ongoing deployment") //TODO fix this test
    @WithMockUser(username = "pygma", roles = "USER")
    public void getAllUsersEndpoint() throws Exception {
        when(userService.getUsers()).thenReturn(List.of(mockUser));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users")
                .accept(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer your-mock-jwt-token"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value(mockUser.getName()))
                .andExpect(jsonPath("$[0].email").value(mockUser.getEmail()))
                .andExpect(jsonPath("$[0].lastname").value(mockUser.getLastname()))
                .andExpect(jsonPath("$[0].phone").value(mockUser.getPhone()));
    }
}
