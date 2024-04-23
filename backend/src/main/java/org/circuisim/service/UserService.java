package org.circuisim.service;

import org.circuisim.domain.User;
import org.circuisim.web.dto.UserDto;

public interface UserService {
    UserDto create(UserDto userDto);

    User getById(Long id);

    User getByEmail(String email);

    UserDto adminCreate(UserDto userDto, String adminKey);
}
