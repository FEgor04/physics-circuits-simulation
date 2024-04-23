package org.forafox.web.security.principal;

import org.springframework.security.core.Authentication;

public interface IAuthenticationFacade {
    Authentication getAuthentication();
    String getAuthName();
}
