package org.circuisim.service;

import org.circuisim.domain.Permission;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SchemeRequest;
import org.circuisim.web.requestRecord.SetPermissionsRequest;
import org.circuisim.web.responseRecord.GetUsersPermissionsResponse;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface SchemeService {
    Scheme create(SchemeCreateRequest schemeCreateRequest, UserDetails userDetails);
    Scheme getById(Long id);
    List<Scheme> getAll();
    Scheme update(SchemeResponse schemeResponse);
    void addPermission(Long schemeId, List<SetPermissionsRequest> request);
    void removePermission(Long schemeId, List<SetPermissionsRequest> request);

    List<GetUsersPermissionsResponse> getUsersById(Long id);
}
