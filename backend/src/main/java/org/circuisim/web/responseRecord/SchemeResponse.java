package org.circuisim.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;

@Schema(description = "Response for getting scheme details", accessMode = Schema.AccessMode.READ_ONLY)
public record SchemeResponse(
        @Schema(description = "Scheme id", example = "1") @NotNull Long id,
        @Schema(description = "Scheme id", example = "Physics") @NotNull String name,
        @Schema(description = "Scheme author name", example = "test@gmail.com") @NotNull String authorName,
        @Schema(description = "User permission", example = "true") @NotNull boolean canEdit,
        List<ElectricalComponentDto> components

) {
}
