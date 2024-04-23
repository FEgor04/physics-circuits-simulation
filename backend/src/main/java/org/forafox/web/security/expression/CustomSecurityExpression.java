package org.forafox.web.security.expression;

import lombok.RequiredArgsConstructor;
import org.forafox.domain.Role;
import org.forafox.service.UserService;
import org.forafox.web.security.JwtEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service("customSecurityExpression")
@RequiredArgsConstructor
public class CustomSecurityExpression {

    private final UserService userService;
    public boolean canAccessUser(final Long id) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        JwtEntity user = (JwtEntity) authentication.getPrincipal();
        Long userId = user.getId();

        return userId.equals(id) || hasAnyRole(authentication, Role.ADMIN);
    }

    private boolean hasAnyRole(final Authentication authentication,
                               final Role... roles) {
        for (Role role : roles) {
            SimpleGrantedAuthority authority
                    = new SimpleGrantedAuthority(role.name());
            if (authentication.getAuthorities().contains(authority)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasAdminRole(){
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        return hasAnyRole(authentication, Role.ADMIN);
    }
}
