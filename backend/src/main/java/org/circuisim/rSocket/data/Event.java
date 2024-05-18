package org.circuisim.rSocket.data;

import lombok.Data;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.io.Serializable;
import java.util.List;

@Data
public sealed class Event implements Serializable permits DeleteComponentsEvent,
        UpdateComponentEvent,
        UserSelectedEvent,
        UserConnectedEvent,
        UserDisconnectedEvent {
    EventType eventType;
    List<ElectricalComponentDto> components;
}

