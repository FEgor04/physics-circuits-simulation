package org.circuisim.rSocket;

import io.jsonwebtoken.Jwt;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.circuisim.rSocket.data.ConnectRequest;
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
public class RSocketController {

    public static final String SERVER = "Server";
    public static final String RESPONSE = "Response";

    private Map<Long, List<RSocketRequester>> CLIENTS_MAP = new HashMap<>();

    @PreDestroy
    void shutdown() {
        log.info("Detaching all remaining clients...");
        for (Map.Entry<Long, List<RSocketRequester>> entry : CLIENTS_MAP.entrySet()) {
//            Long key = entry.getKey();
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
                    log.info("Client: {} CONNECTED.", connectRequest.getClient());
                    if (CLIENTS_MAP.containsKey(connectRequest.getSchemeId())) {
                        CLIENTS_MAP.get(connectRequest.getSchemeId()).add(requester);
                    } else {
                        List<RSocketRequester> list = new ArrayList<>();
                        list.add(requester);
                        CLIENTS_MAP.put(connectRequest.getSchemeId(), list);
                    }
                })
                .doOnError(error -> {
                    // Warn when channels are closed by clients
                    log.warn("Channel to client {} CLOSED", connectRequest.getClient());
                })
                .doFinally(consumer -> {
                    // Remove disconnected clients from the client list
                    CLIENTS_MAP.get(connectRequest.getSchemeId()).remove(requester);
                    log.info("Client {} DISCONNECTED", connectRequest.getClient());
                })
                .subscribe();

        // Callback to client, confirming connection
        requester.route("client-status")
                .data("OPEN")
                .retrieveFlux(String.class)
                .doOnNext(s -> log.info("Client: {} Free Memory: {}.", connectRequest.getClient(), s))
                .subscribe();
    }

//    public void sendNotification(Long schemeId, Action action) {
//        if (CLIENTS_MAP.containsKey(schemeId)) {
//            for (var requester : CLIENTS_MAP.get(schemeId)) {
//                requester.route("client-data")
//                        .data(action)
//                        .retrieveMono(Action.class)
//                        .block();
//            }
//        }
//    }

//
//    @MessageMapping("request-response")
//    Mono<Message> requestResponse(final Message request) {
//        log.info("Received request-response request: {}", request);
//        return Mono.just(new Message(SERVER, RESPONSE));
//    }
}
