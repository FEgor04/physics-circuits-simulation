package org.circuisim.web.responseRecord;

import lombok.Data;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.SchemeEvent;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.dto.UserDto;

import java.util.List;

public record SchemeResponse(
        String name,
        String authorName,
        boolean can_edit,
        List<ElectricalComponentDto> components

) {
}
