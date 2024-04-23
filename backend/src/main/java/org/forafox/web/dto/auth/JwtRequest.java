package org.forafox.web.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "JWT Request", accessMode = Schema.AccessMode.READ_ONLY)
public class JwtRequest {

    @Schema(description = "Username")
    @NotNull(message = "Username must not be null")
    private String username;

    @Schema(description = "Password")
    @NotNull(message = "Password must not be null")
    private String password;
}