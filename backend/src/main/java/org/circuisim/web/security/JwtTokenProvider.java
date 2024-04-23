package org.circuisim.web.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.exception.AccessDeniedException;
import org.circuisim.service.UserService;
import org.circuisim.service.props.JwtProperties;
import org.circuisim.web.dto.auth.JwtResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static io.jsonwebtoken.Jwts.parser;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProperties jwtProperties;
    private final UserDetailsService userDetailsService;
    private final UserService userService;
    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
    }

    public String createAccessToken(Long userId, String userName, Set<Role> roles) {
        Claims claims = Jwts.claims().subject(userName).add("id", userId).add("roles", resolveRoles(roles)).build();
        //claims.put("id", userId);
        //claims.put("roles", resolveRoles(roles));
        Date now = new Date();
        Date dateValidity = new Date(now.getTime() + jwtProperties.getAccess());
        return Jwts.builder().claims(claims)
                .issuedAt(now)
                .expiration(dateValidity)
                .signWith(key)
                .compact();
    }

    private List<String> resolveRoles(Set<Role> roles) {
        return roles.stream()
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    public String createRefreshToken(Long userId, String userName) {
        Claims claims = Jwts.claims().subject(userName).add("id", userId).build();
        //claims.put("id", userId);
        Date now = new Date();
        Date dateValidity = new Date(now.getTime() + jwtProperties.getRefresh());
        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(dateValidity)
                .signWith(key)
                .compact();
    }

    public JwtResponse refreshUserTokens(String refreshToken) {
        JwtResponse jwtResponse = new JwtResponse();
        if (!validateToken(refreshToken)) {
            throw new AccessDeniedException();
        }
        Long userId = Long.valueOf(getId(refreshToken));
        User user = userService.getById(userId);
        jwtResponse.setId(userId);
        jwtResponse.setName(user.getName());
        jwtResponse.setUsername(user.getUsername());
        jwtResponse.setAccessToken(createAccessToken(userId, user.getUsername(), user.getRoles()));
        jwtResponse.setRefreshToken(createRefreshToken(userId, user.getUsername()));
        return jwtResponse;
    }

    public boolean validateToken(String token) {
        Jws<Claims> claims = parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        return !claims.getPayload().getExpiration().before(new Date());
    }

    private String getId(String token) {
        return parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id")
                .toString();
    }

    private String getUserName(String token) {
        return parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public Authentication getAuthentication(String token) {
        String userName = getUserName(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
