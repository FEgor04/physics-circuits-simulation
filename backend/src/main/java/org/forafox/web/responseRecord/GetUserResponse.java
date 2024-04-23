package org.forafox.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response for getting user details", accessMode = Schema.AccessMode.READ_ONLY)
public record GetUserResponse(
        @Schema(description = "User ID") Long id,
        @Schema(description = "User email") String email,
        @Schema(description = "User name") String name) {
}