package org.circuisim.service;

import org.circuisim.domain.simulation.Scheme;
import org.circuisim.web.requestRecord.SchemeRequest;
import org.circuisim.web.responseRecord.SchemeResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface SchemeService {
    Scheme create(SchemeRequest schemeRequest, UserDetails userDetails);
    Scheme getById(Long id);
    List<Scheme> getAll();
    Scheme update(SchemeResponse schemeResponse);
}
