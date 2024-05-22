package org.circuisim.rSocket;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.circuisim.rSocket.data.*;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Data
@Service
public class RSocketService {
    private final UserService userService;
    private final SchemeService schemeService;
    private final ElectricalComponentService electricalComponentService;

    public Message createMessage(Long schemeId, Long userId, Event event) {
        var user = userService.getById(userId);
        return new Message(schemeId, userId, event);
    }

    public Message parseMessage(Message request) {
        String typeEvent = getEventDescription(request.getEvent());
        switch (typeEvent) {
            case "deleteComponentsEvent":
                DeleteComponentsEvent deleteComponentsEvent = (DeleteComponentsEvent) request.getEvent();
                electricalComponentService.deleteComponents(deleteComponentsEvent.components, request.getSchemeId());
                break;
            case "updateComponentEvent":
                UpdateComponentEvent updateComponentEvent = (UpdateComponentEvent) request.getEvent();
                var scheme = schemeService.getById(request.getSchemeId());
                schemeService.updateSchemeName(scheme.getName(), scheme.getId());
                electricalComponentService.updateComponents(updateComponentEvent.components, scheme.getId());
                break;
            case "userConnectedEvent":
                UserConnectedEvent userConnectedEvent = (UserConnectedEvent) request.getEvent();
                break;
            case "userDisconnectedEvent":
                UserDisconnectedEvent userDisconnectedEvent = (UserDisconnectedEvent) request.getEvent();
                break;
            case "userSelectedEvent":
                UserSelectedEvent userSelectedEvent = (UserSelectedEvent) request.getEvent();
                break;
        }
        return request;
    }


    public static String getEventDescription(Event event) {
        if (event instanceof DeleteComponentsEvent) {
            return "deleteComponentsEvent";
        } else if (event instanceof UpdateComponentEvent) {

            return "updateComponentEvent";
        } else if (event instanceof UserConnectedEvent) {

            return "userConnectedEvent";
        } else if (event instanceof UserDisconnectedEvent) {

            return "userDisconnectedEvent";
        } else if (event instanceof UserSelectedEvent) {

            return "userSelectedEvent";
        } else {
            throw new IllegalArgumentException("Unknown event: " + event);
        }
    }
}
