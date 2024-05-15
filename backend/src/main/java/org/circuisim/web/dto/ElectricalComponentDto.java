package org.circuisim.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.circuisim.domain.simulation.ElectricalComponentPK;
import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.TypeElectricalComponent;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO for Electrical component")
public class ElectricalComponentDto {
    @Schema(description = "Component id ", example = "1")
    @NotNull
    public Long componentId;
    @Schema(description = "Type of component", example = "WIRE")
    @NotNull
    public TypeElectricalComponent type;
    @Schema(description = "Point dto")
    @NotNull
    public PointDto a;
    @Schema(description = "Point dto")
    @NotNull
    public PointDto b;
}
