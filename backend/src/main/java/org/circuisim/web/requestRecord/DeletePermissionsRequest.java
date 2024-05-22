package org.circuisim.web.requestRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.circuisim.domain.Permission;

import java.util.List;

@Schema(description = "Request to delete permissions for users")
public record DeletePermissionsRequest(
        @NotNull
        List<String> usernames
) {
}