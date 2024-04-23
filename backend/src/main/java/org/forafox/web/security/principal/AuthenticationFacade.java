package org.forafox.web.security.principal;

import org.forafox.domain.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade implements IAuthenticationFacade {

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public String getAuthName() {
        return getAuthentication().getName();
    }

    public boolean isAdmin() {
        return getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE" + Role.ADMIN.name().toUpperCase()));
    }
}