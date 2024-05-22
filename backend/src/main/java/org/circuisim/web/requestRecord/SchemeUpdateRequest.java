package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Schema(description = "Request to update scheme")
public record SchemeUpdateRequest(
        @Schema(description = "Scheme new name", example = "Physics 2.0")
        @NotBlank String schemeName,

        @Schema(description = "Embedded status", example = "True") @NotNull
        boolean isEmbedded,
        @RequestBody
        List<ElectricalComponentDto> electricalComponentDto
) {

}
