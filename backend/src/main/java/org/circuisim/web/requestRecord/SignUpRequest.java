package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignUpRequest(
        @Email @NotBlank @Schema(example = "test@gmail.com")
        String email,
        @NotBlank
        String password,
        @NotBlank
        String name) {
}