package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.Schema;
import org.circuisim.web.dto.UserDto;
@Schema
public final class UserConnectedEvent extends Event{
    private String clientRsocketId;
    private Long schemeId;
    private UserDto userDto;
}
