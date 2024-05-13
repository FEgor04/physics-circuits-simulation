package org.circuisim.web.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.SchemeService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.mapper.SchemeMapper;
import org.circuisim.web.requestRecord.SchemeCreateRequest;
import org.circuisim.web.requestRecord.SchemeRequest;
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

    @GetMapping("")
    public List<SchemeResponse> getAllSchemes(
            @AuthenticationPrincipal UserDetails userDetails
    ){
        return schemeMapper.toListResponse(schemeService.getAll(),userDetails.getUsername());
    }
    @GetMapping("{id}")
    public SchemeResponse getSchemeById(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        return schemeMapper.toResponse(schemeService.getById(id),userDetails.getUsername());
    }
    @PutMapping("{id}")
    public ResponseEntity<String> updateScheme(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id,
            @RequestBody List<ElectricalComponentDto> electricalComponentDto,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        electricalComponentService.updateComponents(electricalComponentDto,id,userDetails);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("")
    public SchemeResponse createNewScheme(
            @Validated @RequestBody SchemeCreateRequest schemeCreateRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        return schemeMapper.toResponse(schemeService.create(schemeCreateRequest,userDetails),userDetails.getUsername());
    }
    @PutMapping("{id}/permissions")
    public ResponseEntity<String> setPermissionsByIdScheme(
            @PathVariable @Parameter(description = "Scheme id", required = true) Long id
    ){
        return ResponseEntity.noContent().build();
    }
}
