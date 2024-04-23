package org.forafox.web.mapper.abstract_mapper;

import java.util.List;
import java.util.function.BiConsumer;

public interface Mapper <E, D>{

    D toDto(E entity);

    E toEntity(D dto, BiConsumer<E, D> block);

    List<D> toDtos(List<E> entities);

    List<E> toEntities(List<D> dtos);
}
