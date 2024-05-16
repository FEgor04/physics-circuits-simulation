package org.circuisim.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointDto {
    @Schema(description = "Point x coordinate", example = "4")
    @NotNull
    public int x;
    @Schema(description = "Point y coordinate", example = "5")
    @NotNull
    public int y;
}
