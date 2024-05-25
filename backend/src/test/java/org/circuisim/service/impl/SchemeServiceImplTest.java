package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.BackendApplication;
import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.*;
import org.circuisim.repository.ElectricalComponentRepository;
import org.circuisim.repository.SchemeRepository;
import org.circuisim.service.ElectricalComponentService;
import org.circuisim.service.SchemeService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
class SchemeServiceImplTest {

    @Autowired
    private SchemeService schemeService;

    @Autowired
    private SchemeRepository schemeRepository;

    @Autowired
    private ElectricalComponentRepository electricalComponentRepository;

    @Autowired
    private ElectricalComponentService electricalComponentService;

    @Test
    void testDeleteById_shouldSuccessDelete() {
        User mockUser = new User(1L, "test1", "test@example.com", "123", Set.of(Role.USER));
        Scheme scheme = new Scheme(1L, "Test scheme", false, mockUser, new HashSet<>(), new HashSet<>());
        scheme = schemeService.save(scheme);

        ElectricalComponent electricalComponent = new ElectricalComponent(
                new ElectricalComponentPK(1L, 1L),
                TypeElectricalComponent.RESISTOR,
                1.0,
                1.0,
                scheme,
                new Point(0, 0),
                new Point(0, 0));
        electricalComponentService.save(electricalComponent);

        schemeService.deleteById(scheme.getId());
        assertThat(schemeRepository.count()).isEqualTo(0);
        assertThat(electricalComponentRepository.count()).isEqualTo(0);
    }
}