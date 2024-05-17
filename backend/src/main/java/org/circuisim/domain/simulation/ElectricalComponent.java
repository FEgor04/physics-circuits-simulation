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
    @EmbeddedId
    private ElectricalComponentPK pk;

    private TypeElectricalComponent type;

    private double resistance;

    private double EMF;

    @ManyToOne
    private Scheme scheme;

    @OneToOne
    private Point a;
    @OneToOne
    private Point b;
}
