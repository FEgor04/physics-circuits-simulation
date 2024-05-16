package org.circuisim.domain.simulation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "points")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Point {
    @EmbeddedId
    private PointPK pointPK;

}
