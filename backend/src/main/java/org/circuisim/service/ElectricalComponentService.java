package org.circuisim.service;

import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ElectricalComponentService {
    List<ElectricalComponent> getBySchemeId(Long id);

    void save(ElectricalComponent electricalComponent);

    void updateComponents(List<ElectricalComponentDto> electricalComponentDto, String schemeName, Long schemeId);

    void deleteComponents(List<ElectricalComponentDto> components, Long schemeId);
}
