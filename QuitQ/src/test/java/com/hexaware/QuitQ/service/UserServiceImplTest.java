package com.hexaware.QuitQ.service;

import com.hexaware.QuitQ.entity.user;
import com.hexaware.QuitQ.entity.userRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class UserServiceImplTest {

    @Mock
    private userRepo repo;

    @Mock
    private BCryptPasswordEncoder encoder;

    @InjectMocks
    private UserServiceImpl service;

    private user sampleUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleUser = new user();
        sampleUser.setEmail("abc@example.com");
        sampleUser.setPassword("plain123");
    }

    @Test
    public void testCreateUser_ShouldEncodePasswordAndSave() {
        when(encoder.encode("plain123")).thenReturn("encoded123");
        when(repo.save(any(user.class))).thenReturn(sampleUser);

        user saved = service.createUser(sampleUser);

        assertEquals("encoded123", sampleUser.getPassword());
        verify(repo).save(sampleUser);
    }

    @Test
    public void testGetAllUsers() {
        when(repo.findAll()).thenReturn(Arrays.asList(sampleUser));

        List<user> result = service.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("abc@example.com", result.get(0).getEmail());
    }

    @Test
    public void testGetUserByEmail() {
        when(repo.findById("abc@example.com")).thenReturn(Optional.of(sampleUser));

        Optional<user> result = service.getUserByEmail("abc@example.com");

        assertTrue(result.isPresent());
        assertEquals("abc@example.com", result.get().getEmail());
    }

    @Test
    public void testUpdateUser() {
        when(repo.save(any(user.class))).thenReturn(sampleUser);

        user result = service.updateUser("abc@example.com", sampleUser);

        assertEquals("abc@example.com", result.getEmail());
        verify(repo).save(sampleUser);
    }

    @Test
    public void testDeleteUser_Exists() {
        when(repo.existsById("abc@example.com")).thenReturn(true);

        boolean result = service.deleteUser("abc@example.com");

        assertTrue(result);
        verify(repo).deleteById("abc@example.com");
    }

    @Test
    public void testDeleteUser_NotExists() {
        when(repo.existsById("abc@example.com")).thenReturn(false);

        boolean result = service.deleteUser("abc@example.com");

        assertFalse(result);
        verify(repo, never()).deleteById("abc@example.com");
    }

    @Test
    public void testUserExists() {
        when(repo.existsById("abc@example.com")).thenReturn(true);

        boolean exists = service.userExists("abc@example.com");

        assertTrue(exists);
    }

    
}
