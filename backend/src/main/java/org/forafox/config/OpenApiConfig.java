package org.forafox.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;

@OpenAPIDefinition(
        info = @Info(
                title = "Forum Engine",
                description = "Sample API of the Forum/Message Board engine", version = "1.0.0",
                contact = @Contact(
                        name = "Karabanov Andrey",
                        email = "deskpa@yandex.ru"
                )
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Default Server URL"),
        },
        tags = {
                @Tag(name = "Admin API", description = "API for administrators"),
                @Tag(name = "Authorization and Registration", description = "User authorization and registration"),
                @Tag(name = "Client API", description = "API for client")

        }
)
@SecurityScheme(
        name = "JWT",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class OpenApiConfig {

}
