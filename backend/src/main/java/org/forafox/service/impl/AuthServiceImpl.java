package org.forafox.service.impl;

import lombok.RequiredArgsConstructor;
import org.forafox.domain.User;
import org.forafox.service.AuthService;
import org.forafox.service.UserService;
import org.forafox.web.dto.auth.JwtRequest;
import org.forafox.web.dto.auth.JwtResponse;
import org.forafox.web.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public JwtResponse login(final JwtRequest loginRequest) {
        JwtResponse jwtResponse = new JwtResponse();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (Exception e) {
            throw new BadCredentialsException(e.getMessage());
        }
        User user = userService.getByEmail(loginRequest.getUsername());
        jwtResponse.setId(user.getId());
        jwtResponse.setName(user.getName());
        jwtResponse.setUsername(user.getUsername());
        jwtResponse.setAccessToken(jwtTokenProvider.createAccessToken(
                user.getId(), user.getUsername(), user.getRoles())
        );
        jwtResponse.setRefreshToken(jwtTokenProvider.createRefreshToken(
                user.getId(), user.getUsername())
        );
        return jwtResponse;
    }

    @Override
    public JwtResponse refresh(final String refreshToken) {
        return jwtTokenProvider.refreshUserTokens(refreshToken);
    }

}