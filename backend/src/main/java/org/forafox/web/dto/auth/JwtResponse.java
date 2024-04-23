package org.forafox.web.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "JWT Response")
public class JwtResponse {

    @Schema(description = "User ID")
    @NotNull
    private Long id;

    @Schema(description = "User name")
    @NotNull
    private String name;

    @Schema(description = "Username")
    @NotNull
    private String username;

    @Schema(description = "Access token")
    @NotNull
    private String accessToken;

    @Schema(description = "Refresh token")
    @NotNull
    private String refreshToken;
}