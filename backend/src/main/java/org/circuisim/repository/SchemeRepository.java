package org.circuisim.repository;

import jakarta.transaction.Transactional;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM ElectricalComponent e WHERE e.scheme.id = :schemeId")
    void deleteComponentsBySchemeId(Long schemeId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Scheme s WHERE s.id = :schemeId")
    void deleteSchemeById(Long schemeId);

    @Modifying
    @Transactional
    default void deleteSchemeAndComponents(Long schemeId) {
        deleteComponentsBySchemeId(schemeId);
        deleteSchemeById(schemeId);
    }
    List<Scheme> findAllByAuthorOrRedactorsContainingOrViewersContaining(User author, Set<User> redactors, Set<User> viewers);
}
