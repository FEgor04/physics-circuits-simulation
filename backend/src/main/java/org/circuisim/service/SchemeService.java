package org.circuisim.service;

import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.requestRecord.DeletePermissionsRequest;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SetPermissionsRequest;
import org.circuisim.web.responseRecord.GetUsersPermissionsResponse;
import org.circuisim.web.responseRecord.UserPermissionResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface SchemeService {
    Scheme getByIdAndWithoutUserDetails(Long id);


    Scheme save(Scheme scheme);

    Scheme create(SchemeCreateRequest schemeCreateRequest, UserDetails userDetails);

    Scheme getById(Long id);

    Scheme getByIdAndUsername(String username, Long id);

    List<Scheme> getAllByUsername(String username);

    void addPermission(Long schemeId, List<SetPermissionsRequest> request);

    void removePermission(Long schemeId, DeletePermissionsRequest requests);

    List<GetUsersPermissionsResponse> getUsersById(Long id);

    void deleteById(Long id);

    void updateSchemeName(String schemeName, Long schemeId);

    void updateSchemeEmbeddedStatus(boolean newEmbedded, Long schemeId);

    List<UserPermissionResponse> getAllUsersPermissionsBySchemeId(String username, Long id);
}
