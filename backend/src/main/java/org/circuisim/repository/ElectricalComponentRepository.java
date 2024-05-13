package org.circuisim.repository;

import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElectricalComponentRepository extends JpaRepository<ElectricalComponent, Long> {
    List<ElectricalComponent> findAllBySchemeId(Long id);
}
