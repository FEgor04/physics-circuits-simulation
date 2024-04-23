package org.forafox.exception;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
@Schema(description = "Error message model")
public class ErrorMessage {
    @Schema(example = "404")
    private int statusCode;

    @Schema(example = "2024-04-11T12:00:00.000Z")
    private Date timestamp;

    @Schema(example = "Resource not found")
    private String description;

    @Schema(example = "The requested resource could not be found")
    private String message;
}