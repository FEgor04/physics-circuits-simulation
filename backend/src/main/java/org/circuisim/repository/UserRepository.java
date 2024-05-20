package org.circuisim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.circuisim.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
