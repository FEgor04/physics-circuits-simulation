package org.circuisim.service.impl;

import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.dto.auth.JwtResponse;
import org.circuisim.web.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserServiceImpl clientService;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void login_shouldAuthorizeUserAndReturnJwtResponseWithToken(){
        Long clientId = 1L;
        String username = "username";
        String password = "password";
        Set<Role> roles = Collections.emptySet();
        String accessToken = "accessToken";
        String refreshToken = "refreshToken";
        JwtRequest request = new JwtRequest();
        request.setUsername(username);
        request.setPassword(password);
        User user = new User();
        user.setId(clientId);
        user.setUsername(username);
        user.setRoles(roles);

        when(clientService.getByEmail(username))
                .thenReturn(user);
        when(jwtTokenProvider.createAccessToken(clientId, username, roles))
                .thenReturn(accessToken);
        when(jwtTokenProvider.createRefreshToken(clientId, username))
                .thenReturn(refreshToken);
        JwtResponse response = authService.login(request);
        verify(authenticationManager)
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword())
                );

        assertEquals(response.getUsername(), username);
        assertEquals(response.getId(), clientId);
        assertNotNull(response.getAccessToken());
        assertNotNull(response.getRefreshToken());
    }

    @Test
    void login_shouldRejectUserAuthorizationDueToIncorrectUserName(){
        String username = "username";
        String password = "password";
        JwtRequest request = new JwtRequest();
        request.setUsername(username);
        request.setPassword(password);
        User client = new User();
        client.setUsername(username);

        when(clientService.getByEmail(username))
                .thenThrow(ResourceNotFoundException.class);

        verifyNoInteractions(jwtTokenProvider);
        assertThrows(ResourceNotFoundException.class,
                () -> authService.login(request));
    }

    @Test
    void refresh_shouldRefreshClientToken(){
        String refreshToken = "refreshToken";
        String accessToken = "accessToken";
        String newRefreshToken = "newRefreshToken";
        JwtResponse response = new JwtResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(newRefreshToken);

        when(jwtTokenProvider.refreshUserTokens(refreshToken))
                .thenReturn(response);
        JwtResponse testResponse = authService.refresh(refreshToken);

        verify(jwtTokenProvider).refreshUserTokens(refreshToken);
        assertEquals(testResponse, response);
    }

    @Test
    void response_shouldThrowsSignatureExceptionResponseWithIncorrectAccessToken(){
        String incorrectAccessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcm1hbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzE2MzA1Njk5LCJleHAiOjE3MTYzMDkyOTl9.Xf9plmYSNveojOBBTSJ9gzuvVAWPGAuPshAkLTT-DBlocctzqxI4vtUSIoVmWaNbnPFChouHklFFuSy7WFik_A123";
        assertDoesNotThrow(() -> jwtTokenProvider.getAuthentication(incorrectAccessToken));
    }

}