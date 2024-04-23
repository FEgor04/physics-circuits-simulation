package org.forafox.service.props;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "security.admin.data")
public class AdminProperties {
    private String key;
    private String adminUsername;
    private String adminPassword;
    private String adminName;
}
