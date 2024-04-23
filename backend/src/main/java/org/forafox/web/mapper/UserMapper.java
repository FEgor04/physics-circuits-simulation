package org.forafox.web.mapper;

import org.forafox.domain.User;
import org.forafox.web.dto.UserDto;
import org.forafox.web.mapper.abstract_mapper.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.BiConsumer;

@Component
public class UserMapper implements Mapper<User, UserDto> {

    @Override
    public UserDto toDto(User entity) {
        UserDto userDto = new UserDto();
        userDto.setId(entity.getId());
        userDto.setName(entity.getName());
        userDto.setEmail(entity.getUsername());
        userDto.setPassword(entity.getPassword());
        return userDto;
    }

    @Override
    public User toEntity(UserDto dto, BiConsumer<User, UserDto> block) {
        User user = new User();
        user.setName(dto.getName());
        user.setUsername(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }

    @Override
    public List<UserDto> toDtos(List<User> entities) {
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<User> toEntities(List<UserDto> dtos) {
        return dtos.stream().map(dto -> toEntity(dto, null)).toList();
    }
}
