package org.forafox.web.requestRecord;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignUpRequest(@Email @NotBlank String email, @NotBlank String password, @NotBlank String name) {
}