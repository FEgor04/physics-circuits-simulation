package org.circuisim.rSocket.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Schema for Developer object...")
public class ConnectRequest {
    public Long userId;
    public Long schemeId;
}
