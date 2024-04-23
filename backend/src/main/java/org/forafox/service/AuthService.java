package org.forafox.service;

import org.forafox.web.dto.auth.JwtRequest;
import org.forafox.web.dto.auth.JwtResponse;

public interface AuthService {
    JwtResponse login(JwtRequest loginRequest);

    JwtResponse refresh(String refreshToken);


}