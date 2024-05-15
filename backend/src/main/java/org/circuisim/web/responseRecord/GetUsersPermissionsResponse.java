package org.circuisim.web.responseRecord;

import org.circuisim.domain.Permission;

public record GetUsersPermissionsResponse(
        String username,
        Permission permission
) {
}
