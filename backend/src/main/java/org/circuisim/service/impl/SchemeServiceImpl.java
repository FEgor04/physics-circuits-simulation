package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.circuisim.domain.Permission;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.ElectricalComponentPK;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.SchemeRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.PointService;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.mapper.SchemeMapper;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SchemeRequest;
import org.circuisim.web.requestRecord.SetPermissionsRequest;
import org.circuisim.web.responseRecord.GetUsersPermissionsResponse;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchemeServiceImpl implements SchemeService {

    private final SchemeRepository schemeRepository;
    private final UserService userService;


    @Override
    public Scheme create(SchemeCreateRequest schemeRequest, UserDetails userDetails) {
        var scheme = new Scheme();
        scheme.setName(schemeRequest.name());
        scheme.setAuthor(userService.getByEmail(userDetails.getUsername()));
        Set<User> set = new HashSet<>();
        set.add(scheme.getAuthor());
        scheme.setRedactors(set);
        scheme = this.save(scheme);
        return scheme;
    }

    public Scheme save(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    @Override
    public Scheme getById(Long id) {
        return schemeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Scheme not found"));
    }

    @Override
    public List<Scheme> getAll() {
        return schemeRepository.findAll();
    }

    @Override
    public void addPermission(Long schemeId, List<SetPermissionsRequest> requests) {
        var scheme = getById(schemeId);
        for (var request : requests) {
            var permission = request.permission();
            Set<User> schemeUsers;
            if (permission.equals(Permission.EDIT)) {
                schemeUsers = scheme.getRedactors();
            } else {
                schemeUsers = scheme.getViewers();
            }
            var user = userService.getByEmail(request.username());
            schemeUsers.add(user);
            if (permission.equals(Permission.EDIT)) {
                scheme.setRedactors(schemeUsers);
            } else {
                scheme.setViewers(schemeUsers);
            }
        }
        save(scheme);
    }

    @Override
    public void removePermission(Long schemeId, List<SetPermissionsRequest> requests) {
        Set<User> schemeUsers;
        var scheme = getById(schemeId);
        for (var request : requests) {
            var permission = request.permission();
            if (permission.equals(Permission.EDIT)) {
                schemeUsers = scheme.getRedactors();
            } else {
                schemeUsers = scheme.getViewers();
            }
            var user = userService.getByEmail(request.username());
            schemeUsers.remove(user);


            if (permission.equals(Permission.EDIT)) {
                scheme.setRedactors(schemeUsers);
            } else {
                scheme.setViewers(schemeUsers);
            }
        }
        save(scheme);
    }

    @Override
    public List<GetUsersPermissionsResponse> getUsersById(Long id) {
        var scheme = getById(id);
        var schemeViewers = scheme.getViewers();
        var schemeRedactors = scheme.getRedactors();
        List<GetUsersPermissionsResponse> response = new ArrayList<>();
        for (var user : schemeRedactors) {
            response.add(new GetUsersPermissionsResponse(user.getUsername(), Permission.EDIT));
        }
        for (var user : schemeViewers) {
            if (!schemeRedactors.contains(user))
                response.add(new GetUsersPermissionsResponse(user.getUsername(), Permission.VIEW));
        }
        return response;
    }


}
