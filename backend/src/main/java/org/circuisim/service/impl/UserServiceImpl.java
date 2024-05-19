package org.circuisim.service.impl;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.UserRepository;
import org.circuisim.service.UserService;
import org.circuisim.service.props.AdminProperties;
import org.circuisim.web.dto.UserDto;
import org.circuisim.web.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AdminProperties adminProperties;

    @Override
    @Transactional
    public UserDto create(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getEmail()).isPresent()) {
            throw new IllegalStateException("User already exists.");
        }
        return createUserEntity(userDto);
    }

    @Override
    @Transactional(readOnly = true)
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public User getByEmail(String email) {
        return userRepository.findByUsername(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public UserDto adminCreate(UserDto userDto, String adminKey) {
        if (userRepository.findByUsername(userDto.getEmail()).isPresent()) {
            throw new IllegalStateException("User already exists.");
        }
        if (!adminKey.equals(adminProperties.getKey())) {
            throw new IllegalStateException("The admin key is incorrect!");
        }
        return createAdminEntity(userDto);
    }

    @PostConstruct
    private void insertUsersIntoDb() {
        createAdminUser();
    }

    private void createAdminUser() {
        if (userRepository.findByUsername(adminProperties.getAdminUsername()).isEmpty()) {
            User user = new User();
            user.setName(adminProperties.getAdminName());
            user.setUsername(adminProperties.getAdminUsername());
            user.setPassword(passwordEncoder.encode(adminProperties.getAdminPassword()));
            user.setRoles(Set.of(Role.ADMIN));
            userRepository.save(user);
        }
    }

    private UserDto createUserEntity(UserDto userDto) {
        User user = userMapper.toEntity(userDto, null);
        user.setRoles(Set.of(Role.USER));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toDto(userRepository.save(user));
    }

    private UserDto createAdminEntity(UserDto userDto) {
        User user = userMapper.toEntity(userDto, null);
        user.setRoles(Set.of(Role.ADMIN));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toDto(userRepository.save(user));
    }
}
