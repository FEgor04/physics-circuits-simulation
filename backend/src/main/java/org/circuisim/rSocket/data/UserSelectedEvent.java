package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.Schema;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.util.List;
@Schema
public final class UserSelectedEvent extends Event{
    private List<ElectricalComponentDto> components;
}
