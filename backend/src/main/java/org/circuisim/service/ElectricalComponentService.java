package org.circuisim.service;

import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.ElectricalComponentPK;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ElectricalComponentService {
    List<ElectricalComponent> getBySchemeId(Long id);
    ElectricalComponent save(ElectricalComponent electricalComponent);
    void updateComponents(List<ElectricalComponentDto> electricalComponentDto,Long schemeId, UserDetails userDetails);

}
