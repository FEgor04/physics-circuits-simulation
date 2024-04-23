package org.forafox.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.forafox.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

}
