package org.circuisim.repository;

import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {
    List<Scheme> findAllByAuthor(User user);

    List<Scheme> findAllByEmbeddedIsTrue();

    List<Scheme> findAllByAuthorOrRedactorsContainingOrViewersContaining(User author, Set<User> redactors, Set<User> viewers);
}
