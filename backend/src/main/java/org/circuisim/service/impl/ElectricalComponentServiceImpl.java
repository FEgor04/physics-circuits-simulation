package org.circuisim.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.*;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.SchemeService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.mapper.SchemeMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ElectricalComponentServiceImpl implements ElectricalComponentService {
    private final ElectricalComponentRepository repository;
    private final SchemeService schemeService;

    @Override
    public List<ElectricalComponent> getBySchemeId(Long id) {
        return repository.findAllBySchemeId(id);
    }

    @Override
    public void save(ElectricalComponent electricalComponent) {
        repository.save(electricalComponent);
    }

    @Override
    @Transactional
    public void updateComponents(List<ElectricalComponentDto> list, Long schemeId) {
        repository.deleteAllBySchemeId(schemeId);
        for (ElectricalComponentDto electricalComponentDto : list) {
            createElectricalComponentFromDto(schemeId, electricalComponentDto);
        }
    }

    @Override
    public void deleteComponents(List<ElectricalComponentDto> components, Long schemeId) {
        for (var component : components) {
            repository.deleteById(new ElectricalComponentPK(component.getComponentId(), schemeId));
        }
    }

    private void createElectricalComponentFromDto(Long schemeId, ElectricalComponentDto electricalComponentDto) {
        var scheme = schemeService.getById(schemeId);
        var component = new ElectricalComponent();
        component.setPk(new ElectricalComponentPK(electricalComponentDto.getComponentId(), scheme.getId()));
        component.setScheme(scheme);
        component.setType(electricalComponentDto.getType());
        component.setA(new Point(electricalComponentDto.getA().getX(), electricalComponentDto.getA().getY()));
        component.setB(new Point(electricalComponentDto.getB().getX(), electricalComponentDto.getB().getY()));
        component.setResistance(electricalComponentDto.getResistance());
        component.setEMF(electricalComponentDto.getEmf());
        save(component);
    }
}
