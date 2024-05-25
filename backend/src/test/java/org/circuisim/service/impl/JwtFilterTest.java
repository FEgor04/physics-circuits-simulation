package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.service.AuthService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.dto.auth.JwtResponse;
import org.circuisim.web.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
public class JwtFilterTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;


    @Test
    void returnsErrorWithoutJWTToken() throws Exception {
        this.mockMvc.perform(get("/api/users/me"))
                .andDo(print())
                .andExpect(status().is(401))
                .andExpect(content().string(containsString("No JWT token")));
    }

    @Test
    void returns401OnIncorrectJWT() throws Exception {
        this.mockMvc.perform(get("/api/users/me").header("Authorization", "Bearer SPRING=SHIT"))
                .andDo(print())
                .andExpect(status().is(401))
                .andExpect(content().string(containsString("Invalid JWT token")));
    }


    @Test
    void returns401OnWrongSignature() throws Exception {
        var user = this.userService.create(new UserDto(null, "Test", "test1@test.com", "123456"));
        var token = this.authService.login(new JwtRequest(user.getEmail(), "123456"));
        this.mockMvc.perform(get("/api/users/me").header("Authorization", "Bearer " + token.getAccessToken() + "INVALID"))
                .andDo(print())
                .andExpect(status().is(401))
                .andExpect(content().string(containsString("Invalid JWT token")));
    }

    @Test
    void returnsUserOnCorrectToken() throws Exception {
        var user = this.userService.create(new UserDto(null, "Test", "test2@test.com", "123456"));
        var token = this.authService.login(new JwtRequest(user.getEmail(), "123456"));
        this.mockMvc.perform(get("/api/users/me").header("Authorization", "Bearer " + token.getAccessToken())).andExpect(status().isOk());
    }
}
