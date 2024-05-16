package org.circuisim.domain.simulation;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectricalComponentPK implements Serializable {
    private Long id;
    @Column(name = "foreign_scheme_id")
    private Long schemeId;
}
