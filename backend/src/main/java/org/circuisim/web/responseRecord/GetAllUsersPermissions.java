package org.circuisim.web.responseRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.circuisim.web.dto.UserDto;

import java.util.List;

@Schema(description = "Response for getting user permissions")
@AllArgsConstructor
@Data
public class GetAllUsersPermissions {
    List<UserPermissionResponse> permissions;
}
