package org.circuisim.web.controller;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.service.SchemeService;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
class SchemesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SchemeService schemeService;

    @Test
    void getEmbeddedSchemeByIdWithoutJWT_shouldReturnScheme() {
        Scheme scheme = new Scheme(

        )
        schemeService.save(scheme);
        SchemeResponse schemeResponse = mockMvc.perform(MockMvcRequestBuilders.
                get("api/schemes/")
    }
}