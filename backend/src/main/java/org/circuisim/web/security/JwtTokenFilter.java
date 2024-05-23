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
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.service.SchemeService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
public class JwtTokenFilter extends GenericFilterBean {

    private final String[] allowedPaths = {"docs", "swagger", "h2", "auth"};
    private static final String schemesPathPattern = "/api/schemes/(\\d+)";
    private final JwtTokenProvider jwtTokenProvider;
    private final SchemeService schemeService;
    private final Pattern pattern = Pattern.compile("/api/schemes/(\\d+)");

    @Override
    @SneakyThrows
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain filterChain) {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String bearerToken = httpRequest.getHeader("Authorization");
        if (Arrays.stream(this.allowedPaths).anyMatch(it -> httpRequest.getRequestURI().contains(it))) {
            logger.info("Request to /login or /register. Passing it on without checking JWT");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        var matches = pattern.matcher(httpRequest.getRequestURI());
        var matchFound = matches.find();
        if (matchFound && "GET".equalsIgnoreCase(httpRequest.getMethod())) {
            Scheme scheme = schemeService.getById(Long.parseLong(matches.group(1)));
            if (scheme.isEmbedded()) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            }
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
