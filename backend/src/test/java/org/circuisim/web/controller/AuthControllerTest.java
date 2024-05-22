package org.circuisim.web.controller;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void refreshNoJwtTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh")).andExpect(status().is(401));
    }

    @Test
    void refreshBadJwtTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e111w").header("Authorization", "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e111w")).andDo(print()).andExpect(status().is(401));
    }

    @Test
    void refreshBadJwtRefreshTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e123w").header("Authorization", "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e111w")).andDo(print()).andExpect(status().is(401));
    }

    @Test
    void refreshWithoutAccessTokenShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/refresh").content("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA5NjExLCJleHAiOjE3MTYzMTMyMTF9.E8BMSqQBU2qjlZXTaMu47iV0pTEXEcX2_NzqQQO7dODLNWOcfFxdgJEuvVZxia3Kr2lgOuxr8fg_y0A4r9x1e123w")).andDo(print()).andExpect(status().is(401));
    }
}