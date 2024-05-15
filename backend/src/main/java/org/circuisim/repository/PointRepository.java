package org.circuisim.repository;

import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.PointPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, PointPK> {

}