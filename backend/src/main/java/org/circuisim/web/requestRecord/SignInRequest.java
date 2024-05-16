package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequest(
        @Email @NotBlank @Schema(example = "superman@gmail.com")
        String email,
        @NotBlank @Schema(example = "super1234")
        String password) {
}
