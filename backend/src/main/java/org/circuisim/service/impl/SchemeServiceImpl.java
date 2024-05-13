package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.SchemeRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.PointService;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.circuisim.web.mapper.SchemeMapper;
import org.circuisim.web.requestRecord.SchemeRequest;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchemeServiceImpl implements SchemeService {

    private final SchemeRepository schemeRepository;
    private final UserService userService;
    private final PointService pointService;
    private final SchemeMapper schemeMapper;
    private final ElectricalComponentService electricalComponentService;

    @Override
    public Scheme create(SchemeRequest schemeRequest, UserDetails userDetails) {
        var scheme = new Scheme();
        scheme.setName(schemeRequest.name());
        scheme.setAuthor(userService.getByEmail(userDetails.getUsername()));
        scheme = this.save(scheme);
        saveAllComponents(schemeMapper.toEntities(schemeRequest.components(), scheme), scheme);
        return scheme;
    }

    public Scheme save(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    @Override
    public Scheme getById(Long id) {
        return schemeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Scheme not found"));
    }

    @Override
    public List<Scheme> getAll() {
        return schemeRepository.findAll();
    }

    @Override
    public Scheme update(SchemeResponse schemeResponse) {
        return null;
    }

    private void saveAllComponents(List<ElectricalComponent> components, Scheme scheme) {
        for(ElectricalComponent element : components){
            var point = element.getPoint();
            point = pointService.save(point);
            element.setPoint(point);
            element.setScheme(scheme);
            element = electricalComponentService.save(element);
        }
    }
}
