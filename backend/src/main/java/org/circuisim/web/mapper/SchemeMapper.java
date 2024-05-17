package org.circuisim.web.mapper;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.*;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.UserService;
import org.circuisim.web.dto.ElectricalComponentDto;
import org.circuisim.web.dto.PointDto;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class SchemeMapper {
    private final ElectricalComponentService electricalComponentService;
    private final UserService userService;
    private final UserMapper userMapper;

    public List<SchemeResponse> toListResponse(List<Scheme> all, String username) {
        return all.stream().map(x -> this.toResponse(x, username)).toList();
    }

    public SchemeResponse toResponse(Scheme scheme, String username) {
        User user = userService.getByEmail(username);
        boolean status;
        if (scheme.getRedactors() != null && !scheme.getRedactors().isEmpty()) {
            status = scheme.getRedactors().contains(user) || scheme.getAuthor().getName().equals(username);
        } else {
            status = scheme.getAuthor().getUsername().equals(username);
        }
        return new SchemeResponse(
                scheme.getId(),
                scheme.getName(),
                userMapper.toDto(scheme.getAuthor()).getName(),
                status,
                toDto(electricalComponentService.getBySchemeId(scheme.getId()))
        );
    }

    public List<ElectricalComponentDto> toDto(List<ElectricalComponent> list) {
        return list.stream().map(x -> {
            var electricalComponentDto = new ElectricalComponentDto();
            electricalComponentDto.setComponentId(x.getPk().getId());
            electricalComponentDto.setType(x.getType());
            electricalComponentDto.setResistance(x.getResistance());
            electricalComponentDto.setEMF(x.getEMF());
            electricalComponentDto.setA(new PointDto(x.getA().getPointPK().getX(), x.getA().getPointPK().getY()));
            electricalComponentDto.setB(new PointDto(x.getB().getPointPK().getX(), x.getB().getPointPK().getY()));
            return electricalComponentDto;
        }).toList();
    }

    public List<ElectricalComponent> toEntities(List<ElectricalComponentDto> components, Scheme scheme) {
        return components.stream().map(x -> {
            var electricalComponent = new ElectricalComponent();
            electricalComponent.setPk(new ElectricalComponentPK(x.getComponentId(), scheme.getId()));
            electricalComponent.setScheme(scheme);
            electricalComponent.setType(x.getType());
            electricalComponent.setResistance(x.getResistance());
            electricalComponent.setEMF(x.getEMF());
            electricalComponent.setA(new Point(new PointPK(x.b.x, x.b.y)));
            electricalComponent.setB(new Point(new PointPK(x.a.x, x.a.y)));
            return electricalComponent;
        }).toList();
    }

}
