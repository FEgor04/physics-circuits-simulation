package org.circuisim.service;

import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.PointPK;

public interface PointService {
    Point save(Point point);

    Point getById(PointPK id);
}
