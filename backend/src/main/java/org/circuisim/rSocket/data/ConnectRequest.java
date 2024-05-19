package org.circuisim.rSocket.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConnectRequest {
    private String client;
    private Long schemeId;
}
