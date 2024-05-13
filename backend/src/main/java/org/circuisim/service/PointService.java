package org.circuisim.service;

import org.circuisim.domain.simulation.Point;

public interface PointService {
    Point save(Point point);

    Point getById(Long id);
}
