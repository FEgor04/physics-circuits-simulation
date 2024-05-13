package org.circuisim.service;

import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.Scheme;

import java.util.List;

public interface ElectricalComponentService {
    List<ElectricalComponent> getBySchemeId(Long id);
    ElectricalComponent save(ElectricalComponent electricalComponent);


}
