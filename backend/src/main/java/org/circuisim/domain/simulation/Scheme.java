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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "schemes_redactors",
            joinColumns = @JoinColumn(name = "scheme_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> redactors;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "schemes_viewers",
            joinColumns = @JoinColumn(name = "scheme_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> viewers;
}
