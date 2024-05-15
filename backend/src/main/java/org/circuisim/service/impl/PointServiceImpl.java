package org.circuisim.service.impl;

import lombok.RequiredArgsConstructor;
import org.circuisim.domain.simulation.Point;
import org.circuisim.domain.simulation.PointPK;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.PointRepository;
import org.circuisim.service.PointService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {
    private final PointRepository pointRepository;
    @Override
    public Point save(Point point) {
        return pointRepository.save(point);
    }

    @Override
    public Point getById(PointPK id) {
        return pointRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Point not found"));
    }
}
