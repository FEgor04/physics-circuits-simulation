package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
@Schema(description = "Request to create a schema")
public record SchemeCreateRequest(
        @Schema(description = "Scheme name", example = "Physics")
        @NotNull
        String name
) { }
