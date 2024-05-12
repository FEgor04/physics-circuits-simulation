package org.circuisim.domain.simulation;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "electricalComponents")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectricalComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private TypeElectricalComponent type;

    @ManyToOne
    private Scheme scheme;
}
