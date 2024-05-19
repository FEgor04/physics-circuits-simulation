package org.circuisim.repository;

import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {
    List<Scheme> findAllByAuthor(User user);
}
