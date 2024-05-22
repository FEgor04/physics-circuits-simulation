package org.circuisim.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.Permission;

@Schema(description = "Response for getting user details", accessMode = Schema.AccessMode.READ_ONLY)
public record UserPermissionResponse(
        @Schema(description = "User ID")
        @NotNull Long id,
        @Schema(description = "User email")
        @NotNull String email,
        @Schema(description = "User name")
        @NotNull String name,

        @Schema(description = "User permission")
        @NotNull Permission permission
) {
}
