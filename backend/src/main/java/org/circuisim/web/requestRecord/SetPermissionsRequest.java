package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.Permission;

@Schema(description = "Request to set permissions for users")
public record SetPermissionsRequest(
        @Schema(example = "test@gmail.com")
        @NotNull
        String username,
        @Schema(example = "VIEW")
        @NotNull
        Permission permission

) {
}
