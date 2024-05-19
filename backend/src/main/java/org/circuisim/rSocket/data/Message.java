package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class Message {
    private Long userId;
    private Long schemeId;
    Event event;
}