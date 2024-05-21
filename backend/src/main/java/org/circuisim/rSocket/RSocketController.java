package org.circuisim.rSocket;

import io.jsonwebtoken.Jwt;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.circuisim.rSocket.data.ConnectRequest;
import org.circuisim.rSocket.data.Event;
import org.circuisim.rSocket.data.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.rsocket.RSocketRequester;
import org.springframework.messaging.rsocket.annotation.ConnectMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class RSocketController {
    private final RSocketService rSocketService;
    public static final String SERVER = "Server";
    public static final String RESPONSE = "Response";

    private final Map<Long, List<RSocketRequester>> clients = new HashMap<>();

    @PreDestroy
    void shutdown() {
        log.info("Detaching all remaining clients...");
        for (Map.Entry<Long, List<RSocketRequester>> entry : clients.entrySet()) {
            List<RSocketRequester> value = entry.getValue();
            value.stream().forEach(requester -> requester.rsocket().dispose());
        }
        log.info("Shutting down.");
    }

    @ConnectMapping("shell-client")
    void connectShellClientAndAskForTelemetry(RSocketRequester requester,
                                              @Payload ConnectRequest connectRequest) {

        requester.rsocket()
                .onClose()
                .doFirst(() -> {
                    // Add all new clients to a client list
                    log.info("Client: {} CONNECTED.", connectRequest.getUserId());
                    clients.getOrDefault(connectRequest.getSchemeId(), new ArrayList<>()).add(requester);
                })
                .doOnError(error -> {
                    // Warn when channels are closed by clients
                    log.warn("Channel to client {} CLOSED", connectRequest.getUserId());
                })
                .doFinally(consumer -> {
                    // Remove disconnected clients from the client list
                    clients.getOrDefault(connectRequest.getSchemeId(), new ArrayList<>()).remove(requester);
                    log.info("Client {} DISCONNECTED", connectRequest.getUserId());
                })
                .subscribe();

//        // Callback to client, confirming connection
//        requester.route("client-status")
//                .data("OPEN")
//                .retrieveFlux(String.class)
//                .doOnNext(s -> log.info("Client: {} Free Memory: {}.", connectRequest.getUserId(), s))
//                .subscribe();
    }

    public void sendMessage(Message message) {
        for (var client : clients.get(message.getSchemeId())) {
            client.route("client-data")
                    .data(message)
                    .retrieveMono(Message.class)
                    .block();
        }
    }

    @MessageMapping("client-request")
    public void requestResponse(Message message) {
        log.info("Received request-response request: {}", message);
        sendMessage(rSocketService.parseMessage(message));
    }
}
