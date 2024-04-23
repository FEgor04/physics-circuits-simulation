package org.circuisim.service;

import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.dto.auth.JwtResponse;

public interface AuthService {
    JwtResponse login(JwtRequest loginRequest);

    JwtResponse refresh(String refreshToken);


}