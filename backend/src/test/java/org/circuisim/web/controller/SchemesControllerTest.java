package org.circuisim.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.service.AuthService;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.requestRecord.SchemeUpdateRequest;
import org.circuisim.web.requestRecord.SignUpRequest;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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

    @Autowired
    private ObjectMapper mapper;


    static User mockUser;
    static User mockUserRedactor;
    static User mockEmptyUser;

    @BeforeAll
    static void setUpOnce(@Autowired UserService userService, @Autowired SchemeService schemeService) {
        mockUser = new User(2L, "test1", "test@example.com", "123", Set.of(Role.USER));
        mockUserRedactor = new User(3L, "redactor", "redactor@example.com", "123", Set.of(Role.USER));
        mockEmptyUser = new User(4L, "empty", "empty@example.com", "123", Set.of(Role.USER));

        userService.create(new UserDto(null, "test1", "test@example.com", "123"));
        userService.create(new UserDto(null, "redactor", "redactor@example.com", "123"));
        userService.create(new UserDto(null, "empty", "empty@example.com", "123"));

        Set<User> redactors = new HashSet<>();
        redactors.add(mockUserRedactor);

        Scheme scheme = new Scheme(1L, "Test scheme", false, mockUser, redactors, new HashSet<>());
        Scheme schemeWithEmbeddedStatus = new Scheme(2L, "Test scheme2", true, mockUser, new HashSet<>(), new HashSet<>());

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

    @Test
    void redactorUpdateScheme_shouldSuccess() throws Exception {
        var request = new SchemeUpdateRequest("Test scheme", false, new ArrayList<>());
        var json = mapper.writeValueAsString(request);

        var token = this.authService.login(new JwtRequest(mockUserRedactor.getUsername(), "123"));
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/schemes/1")
                        .header("Authorization", "Bearer " + token.getAccessToken())
                        .content(json).contentType("application/json"))
                .andExpect(status().is(204));
    }

    @Test
    void newUserUpdateScheme_shouldReturn401StatusCode() throws Exception {
        var request = new SchemeUpdateRequest("Test scheme", false, new ArrayList<>());
        var json = mapper.writeValueAsString(request);

        var token = this.authService.login(new JwtRequest(mockEmptyUser.getUsername(), "123"));
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/schemes/1")
                        .header("Authorization", "Bearer " + token.getAccessToken())
                        .content(json).contentType("application/json"))
                .andExpect(status().is(403));
    }
}