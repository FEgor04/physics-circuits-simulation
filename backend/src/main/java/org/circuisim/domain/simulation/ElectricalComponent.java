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

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "x_1")),
            @AttributeOverride(name = "y", column = @Column(name = "y_1"))
    })
    private Point a;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "x_2")),
            @AttributeOverride(name = "y", column = @Column(name = "y_2"))
    })
    private Point b;
}
