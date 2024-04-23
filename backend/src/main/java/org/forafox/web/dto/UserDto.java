package org.forafox.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.forafox.web.dto.validation.OnCreate;
import org.forafox.web.dto.validation.OnUpdate;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO for User")
public class UserDto {

    @Schema(description = "Unique identifier of the user")
    @NotNull(message = "Id must not be null.")
    private Long id;

    @Schema(description = "Name of the user")
    @NotBlank(message = "Name must not be null or empty.")
    @Length(max = 255, message = "Name length must be smaller than 255 characters.")
    private String name;

    @Schema(description = "Email address of the user")
    @NotBlank(message = "Username must not be null or empty.", groups = {OnCreate.class, OnUpdate.class})
    @Length(max = 255, message = "Username length must be smaller than 255 characters.")
    @Email
    private String email;

    @Schema(description = "Password of the user")
    @NotBlank(message = "Password must not be null.")
    @Length(max = 255, message = "Password length must be smaller than 255 characters.")
    private String password;
}
