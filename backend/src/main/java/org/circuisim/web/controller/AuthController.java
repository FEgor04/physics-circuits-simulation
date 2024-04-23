package org.circuisim.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.circuisim.exception.ErrorMessage;
import org.circuisim.service.AuthService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.dto.auth.JwtRequest;
import org.circuisim.web.dto.auth.JwtResponse;
import org.circuisim.web.requestRecord.SignInRequest;
import org.circuisim.web.requestRecord.SignUpAdminRequest;
import org.circuisim.web.requestRecord.SignUpRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@Tag(name = "Authorization and Registration")
@ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successful operation", content = {@Content(schema = @Schema(implementation = JwtResponse.class), mediaType = "application/json")}),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = {@Content(schema = @Schema(implementation = ErrorMessage.class), mediaType = "application/json")})
})
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    @Operation(summary = "User login",
            description = "Authenticates user based on provided credentials and generates JWT token",
            operationId = "login")
    @ApiResponses({
            @ApiResponse(responseCode = "404", description = "User not found", content = {@Content(schema = @Schema(implementation = ErrorMessage.class), mediaType = "application/json")})})
    public JwtResponse login(@Valid @RequestBody SignInRequest loginRequest) {
        return authService.login(new JwtRequest(loginRequest.email(), loginRequest.password()));
    }

    @PostMapping("/register")
    @Operation(summary = "User registration",
            description = "Registers a new user with provided details and generates JWT token",
            operationId = "register")
    public JwtResponse register(@Valid @RequestBody final SignUpRequest request) {
        var user = userService.create(new UserDto(null, request.name(), request.email(), request.password()));
        return authService.login(new JwtRequest(user.getEmail(), request.password()));
    }

    @PostMapping("/register/admin")
    @Operation(summary = "Admin registration",
            description = "Registers a new administrator with provided details and admin key, and generates JWT token",
            operationId = "registerAdmin")
    public JwtResponse registerAdmin(@Valid @RequestBody final SignUpAdminRequest request) {
        var user = userService.adminCreate(new UserDto(null, request.name(), request.email(), request.password()), request.adminKey());
        return authService.login(new JwtRequest(user.getEmail(), request.password()));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh token",
            description = "Refreshes JWT token based on provided refresh token",
            operationId = "refresh")
    public JwtResponse refresh(
            @Valid @RequestBody @NotBlank
            @Parameter(description = "Refresh token used to generate a new JWT token", required = true) String refreshToken) {
        return authService.refresh(refreshToken);
    }

}
