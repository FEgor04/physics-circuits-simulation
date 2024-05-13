package org.circuisim.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
    public Long componentId;
    public TypeElectricalComponent type;
    public PointDto point;
}
