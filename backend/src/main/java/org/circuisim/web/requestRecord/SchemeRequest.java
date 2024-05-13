package org.circuisim.web.requestRecord;

import org.circuisim.domain.simulation.SchemeEvent;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;

public record SchemeRequest(
        Long schemeId,
        String name,
        SchemeEvent eventType,
        List<ElectricalComponentDto> components

) {
}
