package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.ElectricalComponentPK;
import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.AccessDeniedException;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.repository.PointRepository;
import org.circuisim.repository.UserRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.PointService;
import org.circuisim.service.SchemeService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.mapper.SchemeMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ElectricalComponentServiceImpl implements ElectricalComponentService {
    private final ElectricalComponentRepository repository;
    private final UserRepository userRepository;
    private final PointService pointService;
    private final SchemeService schemeService;

    @Override
    public List<ElectricalComponent> getBySchemeId(Long id) {
        return repository.findAllBySchemeId(id);
    }

    @Override
    public ElectricalComponent save(ElectricalComponent electricalComponent) {
        return repository.save(electricalComponent);
    }

    @Override
    public void updateComponents(List<ElectricalComponentDto> list, Long schemeId, UserDetails userDetails) {
        for (ElectricalComponentDto electricalComponentDto : list) {
            var electricalComponent1 = repository.findById(
                    new ElectricalComponentPK(electricalComponentDto.componentId, schemeId)
            );
            if(electricalComponent1.isPresent()) {
                var electricalComponent = electricalComponent1.get();

                var a = pointService.getById(electricalComponent.getA().getId());
                a.setX(electricalComponentDto.getA().getX());
                a.setY(electricalComponentDto.getA().getY());

                var b = pointService.getById(electricalComponent.getB().getId());
                b.setX(electricalComponentDto.getB().getX());
                b.setY(electricalComponentDto.getB().getY());

                pointService.save(a);
                pointService.save(b);
                repository.save(electricalComponent);
            }else{
                var scheme= schemeService.getById(schemeId);
                var component = new ElectricalComponent();
                component.setPk(new ElectricalComponentPK(electricalComponentDto.getComponentId(), scheme.getId()));
                component.setScheme(scheme);
                component.setType(electricalComponentDto.getType());
                var a = pointService.save(
                        new Point(
                                null,
                                electricalComponentDto.getA().getX(),
                                electricalComponentDto.getA().getY()
                        ));
                component.setA(a);
                var b = pointService.save(
                        new Point(
                                null,
                                electricalComponentDto.getB().getX(),
                                electricalComponentDto.getB().getY()
                        ));
                component.setB(b);
                save(component);
            }
        }
    }
    private boolean checkAccess(String username1, String username2, Set<User> users) {
        var user = userRepository.findByUsername(username2).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return username1.equals(username2) || (users != null && users.contains(user));
    }
}
