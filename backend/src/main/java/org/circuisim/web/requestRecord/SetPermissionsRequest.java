package org.circuisim.web.requestRecord;

import org.circuisim.domain.Permission;

public record SetPermissionsRequest(
        String username,
        Permission permission

) {
}
