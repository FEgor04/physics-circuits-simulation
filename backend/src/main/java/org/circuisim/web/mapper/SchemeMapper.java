package org.circuisim.web.mapper;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.ElectricalComponent;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class SchemeMapper {
    private final ElectricalComponentService electricalComponentService;
    private final UserMapper userMapper;

    public List<SchemeResponse> toListResponse(List<Scheme> all) {
        return all.stream().map(this::toResponse).toList();
    }

    public SchemeResponse toResponse(Scheme scheme) {
        return new SchemeResponse(
                scheme.getName(),
                userMapper.toDto(scheme.getAuthor()).getName(),
                true,
                toDto(electricalComponentService.getBySchemeId(scheme.getId()))
        );
    }
    public List<ElectricalComponentDto> toDto(List<ElectricalComponent> list){
        return list.stream().map(x->{
            var electricalComponentDto = new ElectricalComponentDto();
            electricalComponentDto.setId(x.getId());
            electricalComponentDto.setType(x.getType());
            electricalComponentDto.setPoint(x.getPoint());
            return electricalComponentDto;
        }).toList();
    }

    public List<ElectricalComponent> toEntities(List<ElectricalComponentDto> components,Scheme scheme) {
        return components.stream().map(x->{
            var electricalComponent = new ElectricalComponent();
            electricalComponent.setScheme(scheme);
            electricalComponent.setType(x.getType());
            electricalComponent.setPoint(x.getPoint());
            return electricalComponent;
        }).toList();
    }
}
