package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.DiscriminatorMapping;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.circuisim.web.dto.ElectricalComponentDto;

import java.io.Serializable;
import java.util.List;

@Data
@Schema(description = "Event", oneOf = {
        DeleteComponentsEvent.class,
        UpdateComponentEvent.class,
        UserSelectedEvent.class,
        UserConnectedEvent.class,
        UserDisconnectedEvent.class,
}, discriminatorMapping = {
        @DiscriminatorMapping(schema = DeleteComponentsEvent.class, value = "DELETE"),
        @DiscriminatorMapping(schema = UpdateComponentEvent.class, value = "UPDATE"),
        @DiscriminatorMapping(schema = UserSelectedEvent.class, value = "SELECT"),
        @DiscriminatorMapping(schema = UserConnectedEvent.class, value = "CONNECT"),
        @DiscriminatorMapping(schema = UserDisconnectedEvent.class, value = "DISCONNECT"),
}, discriminatorProperty = "type")
public sealed class Event implements Serializable permits DeleteComponentsEvent,
        UpdateComponentEvent,
        UserSelectedEvent,
        UserConnectedEvent,
        UserDisconnectedEvent {
}

