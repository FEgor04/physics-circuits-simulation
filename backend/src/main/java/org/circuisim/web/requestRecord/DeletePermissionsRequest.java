package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.Permission;

@Schema(description = "Request to delete permissions for users")
public record DeletePermissionsRequest(
        @Schema(example = "test@gmail.com")
        @NotNull
        String username
) {
}