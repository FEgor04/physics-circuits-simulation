package org.circuisim.web.responseRecord;

import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;

public record SchemeResponse(
        Long id,
        String name,
        String authorName,
        boolean canEdit,
        List<ElectricalComponentDto> components

) {
}
