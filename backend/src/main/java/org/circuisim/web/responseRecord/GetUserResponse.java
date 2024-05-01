package org.circuisim.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Response for getting user details", accessMode = Schema.AccessMode.READ_ONLY)
public record GetUserResponse(
        @Schema(description = "User ID") @NotNull Long id,
        @Schema(description = "User email") @NotNull String email,
        @Schema(description = "User name") @NotNull String name) {
}