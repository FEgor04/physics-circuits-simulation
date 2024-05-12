package org.circuisim.domain.simulation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.circuisim.domain.User;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Set;

@Entity
@Table(name = "schemes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Scheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private User author;
    @ManyToMany
    @JoinTable(name = "schemes_redactors",
            joinColumns = @JoinColumn(name = "scheme_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> redactors;
}
