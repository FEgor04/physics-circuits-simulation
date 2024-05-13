package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.AccessDeniedException;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.repository.PointRepository;
import org.circuisim.repository.UserRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.PointService;
import org.circuisim.web.dto.ElectricalComponentDto;
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
    @Override
    public List<ElectricalComponent> getBySchemeId(Long id) {
        return repository.findAllBySchemeId(id);
    }
    @Override
    public ElectricalComponent save(ElectricalComponent electricalComponent) {
        return repository.save(electricalComponent);
    }

    @Override
    public void updateComponents(List<ElectricalComponentDto> list, UserDetails userDetails) {
        for (ElectricalComponentDto electricalComponentDto : list) {
            var electricalComponent = repository.findById(electricalComponentDto.getComponent_id()).orElseThrow(() -> new ResourceNotFoundException("Electrical component not found"));
            if(!checkAccess(electricalComponent.getScheme().getAuthor().getUsername(),
                    userDetails.getUsername(),
                    electricalComponent.getScheme().getRedactors())){
                throw new AccessDeniedException();
            }
            var point = pointService.getById(electricalComponent.getPoint().getId());
            point.setA(electricalComponentDto.getPoint().getA());
            point.setB(electricalComponentDto.getPoint().getB());
            pointService.save(point);
            repository.save(electricalComponent);
        }
    }
    private boolean checkAccess(String username1, String username2, Set<User> users){
        var user =userRepository.findByUsername(username2).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return username1.equals(username2) || (users != null && users.contains(user));
    }
}
