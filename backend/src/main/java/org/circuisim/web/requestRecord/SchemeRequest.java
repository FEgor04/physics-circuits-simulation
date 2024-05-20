package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.simulation.SchemeEvent;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;

@Schema(description = "Request to add elements to a scheme")
public record SchemeRequest(
        @Schema(description = "Scheme id ", example = "1")
        @NotNull
        Long schemeId,
        @Schema(description = "Scheme name", example = "Physics")
        @NotNull
        String name,
        @Schema(description = "Sheme event", example = "CREATE")
        @NotNull
        SchemeEvent eventType,
        List<ElectricalComponentDto> components

) {
}
