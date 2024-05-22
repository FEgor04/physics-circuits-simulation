package org.circuisim.web.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.circuisim.exception.AccessDeniedException;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.SchemeService;
import org.circuisim.web.mapper.SchemeMapper;
import org.circuisim.web.mapper.UserMapper;
import org.circuisim.web.requestRecord.DeletePermissionsRequest;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SchemeUpdateRequest;
import org.circuisim.web.requestRecord.SetPermissionsRequest;
import org.circuisim.web.responseRecord.GetAllUsersPermissions;
import org.circuisim.web.responseRecord.GetUsersPermissionsResponse;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schemes")
@Tag(name = "Scheme API", description = "Endpoints for managing schemes")
@SecurityRequirement(name = "JWT")
public class SchemesController {
    private final SchemeService schemeService;
    private final SchemeMapper schemeMapper;
    private final ElectricalComponentService electricalComponentService;

    @PostMapping("")
    public SchemeResponse createNewScheme(
            @Validated @RequestBody SchemeCreateRequest schemeCreateRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return schemeMapper.toResponse(schemeService.create(schemeCreateRequest, userDetails), userDetails.getUsername());
    }

    @GetMapping("")
    public List<SchemeResponse> getAllSchemes(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return schemeMapper.toListResponse(schemeService.getAllByUsername(userDetails.getUsername()), userDetails.getUsername());
    }

    @GetMapping("{id}")
    public SchemeResponse getSchemeById(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return schemeMapper.toResponse(schemeService.getByIdAndUsername(userDetails.getUsername(), id), userDetails.getUsername());
    }

    @GetMapping("{id}/permissions")
    public GetAllUsersPermissions getAllUsersPermissionsBySchemeId(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new GetAllUsersPermissions(schemeService.getAllUsersPermissionsBySchemeId(userDetails.getUsername(), id));
    }

    @GetMapping("{id}/users")
    public List<GetUsersPermissionsResponse> getAllUsersBySchemeId(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id
    ) {
        return schemeService.getUsersById(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<String> updateScheme(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @RequestBody SchemeUpdateRequest schemeUpdateRequest
    ) {
        schemeService.updateSchemeName(schemeUpdateRequest.schemeName(), id);
        schemeService.updateSchemeEmbeddedStatus(schemeUpdateRequest.isEmbedded(), id);
        electricalComponentService.updateComponents(schemeUpdateRequest.electricalComponentDto(), id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}/permissions")
    public ResponseEntity<String> setPermissionsByIdScheme(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @RequestBody List<SetPermissionsRequest> request
    ) {
        schemeService.addPermission(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}/permissions")
    public ResponseEntity<String> deletePermissionsByIdScheme(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @RequestBody DeletePermissionsRequest request
    ) {
        schemeService.removePermission(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSchemeById(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (schemeService.getById(id).getAuthor().getUsername().equals(userDetails.getUsername())) {
            schemeService.deleteById(id);
        } else {
            throw new AccessDeniedException();
        }
        return ResponseEntity.noContent().build();
    }


}
