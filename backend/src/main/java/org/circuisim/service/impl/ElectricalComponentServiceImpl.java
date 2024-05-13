package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.service.ElectricalComponentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ElectricalComponentServiceImpl implements ElectricalComponentService {
    private final ElectricalComponentRepository repository;
    @Override
    public List<ElectricalComponent> getBySchemeId(Long id) {
        return repository.findAllBySchemeId(id);
    }

    @Override
    public ElectricalComponent save(ElectricalComponent electricalComponent) {
        return repository.save(electricalComponent);
    }
}
