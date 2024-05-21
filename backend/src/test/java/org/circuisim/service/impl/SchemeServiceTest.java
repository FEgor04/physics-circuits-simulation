package org.circuisim.service.impl;

import org.circuisim.domain.Role;
import org.circuisim.domain.User;
import org.circuisim.domain.simulation.Scheme;
import org.circuisim.exception.ResourceNotFoundException;
import org.circuisim.repository.SchemeRepository;
import org.circuisim.service.SchemeService;
import org.circuisim.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class SchemeServiceTest {

    @Mock
    private SchemeRepository schemeRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private SchemeServiceImpl schemeService;

    private List<Scheme> mockSchemes;
    private List<Scheme> emptyMockSchemes;

    @BeforeEach
    void setUp() {
        User mockUser = new User(1L, "test1", "test@example.com", "123", Set.of(Role.USER));
        User mockUserEgor = new User(2L, "egor", "egor@example.com", "123", Set.of(Role.USER));

        Scheme scheme1 = new Scheme();
        scheme1.setAuthor(mockUser);

        Scheme scheme2 = new Scheme();
        scheme2.setAuthor(mockUser);

        mockSchemes = Arrays.asList(scheme1, scheme2);
        emptyMockSchemes = new ArrayList<>();

        when(userService.getByEmail("test@example.com")).thenReturn(mockUser);
        when(userService.getByEmail("egor@example.com")).thenReturn(mockUserEgor);
        when(schemeRepository.findAllByAuthorOrRedactorsContainingOrViewersContaining(mockUser,
                Set.of(mockUser), Set.of(mockUser))).thenReturn(mockSchemes);
        when(schemeRepository.findAllByAuthorOrRedactorsContainingOrViewersContaining(mockUserEgor,
                Set.of(mockUserEgor), Set.of(mockUserEgor))).thenReturn(emptyMockSchemes);
    }

    @Test
    void testGetAllSchemeByUsername_shouldReturnAllSchemeWithCurrentUser() {
        String username = "test@example.com";
        List<Scheme> result = schemeService.getAllByUsername(username);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(mockSchemes, result);
    }

    @Test
    void testGetAllSchemeByUsername_shouldReturnEmptyList() {
        String username = "egor@example.com";
        List<Scheme> result = schemeService.getAllByUsername(username);

        assertNotNull(result);
        assertTrue(result.isEmpty());
        assertEquals(emptyMockSchemes, result);
    }
}