package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.circuisim.domain.Permission;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.AccessDeniedException;
import org.circuisim.exception.AuthorPermissionsConflictException;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.SchemeRepository;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.requestRecord.DeletePermissionsRequest;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SetPermissionsRequest;
import org.circuisim.web.responseRecord.GetUsersPermissionsResponse;
import org.circuisim.web.responseRecord.UserPermissionResponse;
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
        scheme = this.save(scheme);
        return scheme;
    }

    @Override
    public Scheme save(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    @Override
    public Scheme getById(Long id) {
        return schemeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Scheme not found"));
    }

    @Override
    public Scheme getByIdAndUsername(String username, Long id) {
        var scheme = schemeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Scheme not found"));
        var user = userService.getByEmail(username);
        if (checkAccessSchemeForUser(scheme, user)) {
            return scheme;
        } else {
            throw new AccessDeniedException();
        }
    }

    @Override
    public List<Scheme> getAllByUsername(String username) {
        var user = userService.getByEmail(username);
        return schemeRepository.findAllByAuthorOrRedactorsContainingOrViewersContaining(user,
                Set.of(user), Set.of(user));
    }

    @Override
    public void addPermission(Long schemeId, List<SetPermissionsRequest> requests) {

        var scheme = getById(schemeId);
        checkAuthorSchemePermissionAdd(scheme, requests);
        Set<User> schemeViewUsers = new HashSet<>();
        Set<User> schemeRedactorsUsers = new HashSet<>();
        for (var request : requests) {
            var permission = request.permission();

            var user = userService.getByEmail(request.username());

            if (permission.equals(Permission.EDIT)) {
                schemeRedactorsUsers.add(user);
            } else {
                schemeViewUsers.add(user);
            }
            scheme.setViewers(schemeViewUsers);
            scheme.setRedactors(schemeRedactorsUsers);
        }
        save(scheme);
    }


    @Override
    public void removePermission(Long schemeId, DeletePermissionsRequest requests) {
        var scheme = getById(schemeId);
        checkAuthorSchemePermissionDelete(scheme, requests);
        Set<User> schemeViewUsers = scheme.getViewers();
        Set<User> schemeRedactorsUsers = scheme.getRedactors();
        for (var request : requests.usernames()) {
            var user = userService.getByEmail(request);
            removePermissionForUser(user, schemeRedactorsUsers, schemeViewUsers);
        }
        scheme.setRedactors(schemeRedactorsUsers);
        scheme.setViewers(schemeViewUsers);
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

    @Override
    public void deleteById(Long id) {
        schemeRepository.deleteById(id);
    }

    @Override
    public void updateSchemeName(String schemeName, Long schemeId) {
        var scheme = getById(schemeId);
        if (!scheme.getName().equals(schemeName)) {
            scheme.setName(schemeName);
            save(scheme);
        }
    }

    @Override
    public void updateSchemeEmbeddedStatus(boolean newEmbedded, Long schemeId) {
        var scheme = getById(schemeId);
        scheme.setEmbedded(newEmbedded);
        save(scheme);
    }

    @Override
    public List<UserPermissionResponse> getAllUsersPermissionsBySchemeId(String username, Long id) {
        var scheme = getById(id);
        var users = scheme.getViewers();
        var list = createUserResponseListWithPermissionVIEW(users);
        list.addAll(createUserResponseListWithPermissionEDIT(scheme.getRedactors()));
        return list;
    }

    private boolean checkAccessSchemeForUser(Scheme scheme, User user) {
        return scheme.isEmbedded() ||
                scheme.getRedactors().contains(user) ||
                scheme.getViewers().contains(user) ||
                scheme.getAuthor().equals(user);
    }

    private List<UserPermissionResponse> createUserResponseListWithPermissionEDIT(Set<User> list) {
        List<UserPermissionResponse> userPermissionResponses = new ArrayList<>();
        for (var user : list) {
            userPermissionResponses.add(new UserPermissionResponse(user.getId(), user.getUsername(), user.getName(), Permission.EDIT));
        }
        return userPermissionResponses;
    }

    private List<UserPermissionResponse> createUserResponseListWithPermissionVIEW(Set<User> list) {
        List<UserPermissionResponse> userPermissionResponses = new ArrayList<>();
        for (var user : list) {
            userPermissionResponses.add(new UserPermissionResponse(user.getId(), user.getUsername(), user.getName(), Permission.VIEW));
        }
        return userPermissionResponses;
    }

    public void removePermissionForUser(User user, Set<User> schemeRedactorsUsers, Set<User> schemeViewUsers) {

        schemeViewUsers.remove(user);
        schemeRedactorsUsers.remove(user);
    }

    private void checkAuthorSchemePermissionAdd(Scheme scheme, List<SetPermissionsRequest> requests) {
        for (var request : requests) {
            if (request.username().equals(scheme.getAuthor().getUsername())) {
                throw new AuthorPermissionsConflictException("You cannot change your access!");
            }
        }
    }

    private void checkAuthorSchemePermissionDelete(Scheme scheme, DeletePermissionsRequest requests) {
        for (var request : requests.usernames()) {
            if (request.equals(scheme.getAuthor().getUsername())) {
                throw new AuthorPermissionsConflictException("You cannot change your access!");
            }
        }
    }


}
