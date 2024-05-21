package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.*;
import org.circuisim.exception.ResourceNotFoundException;
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
    public void updateComponents(List<ElectricalComponentDto> list, String schemeName, Long schemeId) {
        schemeService.updateSchemeName(schemeName, schemeId);
        for (ElectricalComponentDto electricalComponentDto : list) {
            var electricalComponent1 = repository.findById(
                    new ElectricalComponentPK(electricalComponentDto.componentId, schemeId)
            );
            if (electricalComponent1.isPresent()) {
                var electricalComponent = electricalComponent1.get();
                updatePresentComponent(electricalComponent, electricalComponentDto);
            } else {
                updateNotPresentComponent(schemeId, electricalComponentDto);
            }
        }
    }

    @Override
    public void deleteComponents(List<ElectricalComponentDto> components, Long schemeId) {
        for (ElectricalComponentDto electricalComponentDto : components) {
            var electricalComponent = repository.findById(new ElectricalComponentPK(electricalComponentDto.componentId, schemeId)).
                    orElseThrow(() -> new ResourceNotFoundException("electricalComponent not found"));
            repository.delete(electricalComponent);
        }
    }

    private void updatePresentComponent(ElectricalComponent electricalComponent, ElectricalComponentDto electricalComponentDto) {
        electricalComponent.setA(new Point(electricalComponentDto.getA().getX(), electricalComponentDto.getA().getY()));
        electricalComponent.setB(new Point(electricalComponentDto.getB().getX(), electricalComponentDto.getB().getY()));
        electricalComponent.setEMF(electricalComponentDto.getEmf());
        electricalComponent.setResistance(electricalComponentDto.getResistance());
        repository.save(electricalComponent);
    }

    private void updateNotPresentComponent(Long schemeId, ElectricalComponentDto electricalComponentDto) {
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
