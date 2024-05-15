package org.circuisim.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.Permission;

@Schema(description = "Response for getting users permissions details")
public record GetUsersPermissionsResponse(
        @Schema(example = "username@gmail.com") @NotNull  String username,
        @Schema(example = "VIEW") @NotNull Permission permission
) {
}
