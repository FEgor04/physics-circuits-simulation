package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.*;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.PointService;
import org.circuisim.service.SchemeService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ElectricalComponentServiceImpl implements ElectricalComponentService {
    private final ElectricalComponentRepository repository;
    private final PointService pointService;
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
    public void updateComponents(List<ElectricalComponentDto> list, Long schemeId) {
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

    private void updatePresentComponent(ElectricalComponent electricalComponent, ElectricalComponentDto electricalComponentDto) {

        var a = pointService.getById(electricalComponent.getA().getPointPK());
        var pointPK = new PointPK(electricalComponentDto.getA().getX(), electricalComponentDto.getA().getY());
        a.setPointPK(pointPK);

        var b = pointService.getById(electricalComponent.getB().getPointPK());
        pointPK = new PointPK(electricalComponentDto.getB().getX(), electricalComponentDto.getB().getY());
        b.setPointPK(pointPK);

        pointService.save(a);
        pointService.save(b);
        repository.save(electricalComponent);
    }

    private void updateNotPresentComponent(Long schemeId, ElectricalComponentDto electricalComponentDto) {
        var scheme = schemeService.getById(schemeId);
        var component = new ElectricalComponent();
        component.setPk(new ElectricalComponentPK(electricalComponentDto.getComponentId(), scheme.getId()));
        component.setScheme(scheme);
        component.setType(electricalComponentDto.getType());
        var a = pointService.save(
                new Point(
                        new PointPK(electricalComponentDto.getA().getX(), electricalComponentDto.getA().getY())));
        component.setA(a);
        var b = pointService.save(
                new Point(new PointPK(electricalComponentDto.getB().getX(), electricalComponentDto.getB().getY())));
        component.setB(b);
        save(component);
    }
}
