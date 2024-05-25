package org.circuisim.web.controller;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.service.AuthService;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
class SchemesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private SchemeService schemeService;

    static User mockUser;

    @BeforeAll
    static void setUpOnce(@Autowired UserService userService, @Autowired SchemeService schemeService) {
        userService.create(new UserDto(null, "test1", "test@example.com", "123"));

        mockUser = userService.getByEmail("test@example.com");

        Scheme scheme = new Scheme(1L, "Test scheme", false, mockUser, new HashSet<>(), new HashSet<>());
        Scheme schemeWithEmbeddedStatus = new Scheme(2L, "Test scheme", true, mockUser, new HashSet<>(), new HashSet<>());

        schemeService.save(scheme);
        schemeService.save(schemeWithEmbeddedStatus);
    }

    @Test
    void getSchemeByIdWithoutJWT_shouldReturn401Status() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.
                get("/api/schemes/1")).andExpect(status().is(401));
    }

    @Test
    void getEmbeddedSchemeByIdWithoutJWT_shouldReturnScheme() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.
                get("/api/schemes/2")).andExpect(status().is(200));
    }

    @Test
    void getEmbeddedSchemeByIdWithJWT_shouldReturnScheme() throws Exception {
        var token = this.authService.login(new JwtRequest(mockUser.getUsername(), "123"));
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/schemes/1")
                        .header("Authorization", "Bearer " + token.getAccessToken()))
                .andExpect(status().is(200));
    }
}
