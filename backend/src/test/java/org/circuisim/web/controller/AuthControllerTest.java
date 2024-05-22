package org.circuisim.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.circuisim.service.AuthService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.requestRecord.SignUpRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private ObjectMapper mapper;

    @Test
    void refreshNoJwtTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh")).andExpect(status().is(400));
    }

    @Test
    void refreshBadJwtTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e111w").header("Authorization", "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e111w")).andDo(print()).andExpect(status().is(401));
    }


    @Test
    void refreshWithoutAccessTokenWithBadRefreshTokenShouldReturnUnauthorized() throws Exception {
        var refreshToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e123w";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content(refreshToken))
                .andDo(print())
                .andExpect(status().is(401));
    }

    @Test
    void refreshWithoutAccessTokenWithGoodRefreshTokenShouldReturnOk() throws Exception {
        var user = this.userService.create(new UserDto(null, "Test", "test1@test.com", "123456"));
        var token = this.authService.login(new JwtRequest(user.getEmail(), "123456"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content(token.getRefreshToken()))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    void registerShouldBeAvailableWithoutJWT() throws Exception {
        var request = new SignUpRequest("newuser@gmail.com", "password", "New User");
        var json = mapper.writeValueAsString(request);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register").content(json).contentType("application/json"))
                .andDo(print()).andExpect(status().isOk());
    }
}