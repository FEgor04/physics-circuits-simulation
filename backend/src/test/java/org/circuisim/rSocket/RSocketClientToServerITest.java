//package org.circuisim.rSocket;
//
//import lombok.extern.slf4j.Slf4j;
//import org.circuisim.rSocket.data.Message;
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.messaging.rsocket.RSocketRequester;
//import reactor.core.publisher.Mono;
//import reactor.test.StepVerifier;
//
//import java.time.Duration;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//
//@SpringBootTest
//@Slf4j
//public class RSocketClientToServerITest {
//
//    private static RSocketRequester requester;
//
//    @BeforeAll
//    public static void setupOnce(@Autowired RSocketRequester.Builder builder, @Value("${spring.rsocket.server.port}") Integer port) {
//        requester = builder
//                .connectTcp("localhost", port)
//                .block();
//    }
//    @Test
//    public void testRequestGetsResponse() {
//        // Send a request message
//        Mono<Message> result = requester
//                .route("request-response")
//                .data(new Message("TEST", "Request"))
//                .retrieveMono(Message.class);
//
//        // Verify that the response message contains the expected data
//        StepVerifier
//                .create(result)
//                .consumeNextWith(message -> {
//                    assertThat(message.getOrigin()).isEqualTo(RSocketController.SERVER);
//                    assertThat(message.getInteraction()).isEqualTo(RSocketController.RESPONSE);
//                    assertThat(message.getIndex()).isEqualTo(0);
//                })
//                .verifyComplete();
//    }
//
//    @Test
//    public void testNoMatchingRouteGetsException() {
//        // Send a request with bad route and data
//        Mono<String> result = requester
//                .route("invalid")
//                .data("anything")
//                .retrieveMono(String.class);
//
//        // Verify that an error is generated
//        StepVerifier.create(result)
//                .expectErrorMessage("No handler for destination 'invalid'")
//                .verify(Duration.ofSeconds(5));
//    }
//
//    @AfterAll
//    public static void tearDownOnce() {
//        requester.rsocket().dispose();
//    }
//}