package org.circuisim.web.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.WeakKeyException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
public class JwtTokenFilter extends GenericFilterBean {

    private final String[] allowedPaths = {"docs", "swagger", "h2", "auth"};
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @SneakyThrows
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain filterChain) {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String bearerToken = httpRequest.getHeader("Authorization");
        if (Arrays.stream(this.allowedPaths).anyMatch(it -> httpRequest.getPathInfo().contains(it))) {
            logger.info("Request to /login or /register. Passing it on without checking JWT");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        try {
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                bearerToken = bearerToken.substring(7);
                if (jwtTokenProvider.validateToken(bearerToken)) {
                    Authentication authentication = jwtTokenProvider.getAuthentication(bearerToken);
                    if (authentication != null) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } else {
                var httpResponse = (HttpServletResponse) servletResponse;
                httpResponse.setStatus(401);
                httpResponse.getWriter().println("No JWT token");
                return;
            }
        } catch (io.jsonwebtoken.security.SignatureException | MalformedJwtException | ExpiredJwtException e) {
            var httpResponse = (HttpServletResponse) servletResponse;
            httpResponse.setStatus(401);
            httpResponse.getWriter().println("Invalid JWT token");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
