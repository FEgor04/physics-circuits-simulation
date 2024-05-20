package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.Schema;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;
@Schema
public final class UpdateComponentEvent extends Event{
    public List<ElectricalComponentDto> components;
}
