package org.forafox.service;

import org.forafox.domain.User;
import org.forafox.web.dto.UserDto;

public interface UserService {
    UserDto create(UserDto userDto);

    User getById(Long id);

    User getByEmail(String email);

    UserDto adminCreate(UserDto userDto, String adminKey);
}
