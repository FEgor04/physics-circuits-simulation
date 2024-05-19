package org.circuisim.rSocket.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String origin;
    private String interaction;
    private long index;
    private long created = Instant.now().getEpochSecond();

    public Message(String origin, String interaction) {
        this.origin = origin;
        this.interaction = interaction;
        this.index = 0;
    }

}